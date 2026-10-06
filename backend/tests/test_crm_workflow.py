from .conftest import auth_headers


def test_complete_crm_workflow_lifecycle(client):
    headers = auth_headers(client)

    # 1. Create a new lead: "Devendra Patil"
    lead_payload = {
        "name": "Devendra Patil",
        "contact": "+91 98220 99887",
        "email": "devendra.patil@example.com",
        "phone": "+91 98220 99887",
        "location": "Pune, MH",
        "property_type": "Residential",
        "source": "Website",
        "status": "New",
        "estimated_value": 450000.0,
    }
    lead_res = client.post("/api/v1/leads", json=lead_payload, headers=headers)
    assert lead_res.status_code == 201
    lead_data = lead_res.json()["data"]
    lead_id = lead_data["id"]
    assert lead_data["status"] == "New"
    assert lead_data["customer_id"] is None

    # 2. Transition lead from New -> Contacted via workflow endpoint
    contact_res = client.post(f"/api/v1/leads/{lead_id}/contact", headers=headers)
    assert contact_res.status_code == 200
    contacted_lead = contact_res.json()["data"]
    assert contacted_lead["status"] == "Contacted"
    customer_id = contacted_lead["customer_id"]
    assert customer_id is not None

    # Verify customer was created in PostgreSQL
    cust_res = client.get(f"/api/v1/customers/{customer_id}", headers=headers)
    assert cust_res.status_code == 200
    customer_data = cust_res.json()["data"]
    assert customer_data["name"] == "Devendra Patil"
    assert customer_data["email"] == "devendra.patil@example.com"
    assert customer_data["total_projects"] == 0

    # Ensure repeated contact does not create duplicate customer
    repeat_contact = client.post(f"/api/v1/leads/{lead_id}/contact", headers=headers)
    assert repeat_contact.status_code == 200
    assert repeat_contact.json()["data"]["customer_id"] == customer_id

    # 3. Schedule Site Survey for lead
    survey_payload = {
        "survey_date": "2026-10-15",
        "time_slot": "10:30 AM",
        "assigned_to": "Karan",
        "roof_information": "RCC flat roof with 1200 sq ft shadow-free area",
        "capacity_estimate": "12 kW",
        "notes": "Customer interested in high-efficiency mono PERC panels",
    }
    survey_res = client.post(
        f"/api/v1/leads/{lead_id}/schedule-survey",
        json=survey_payload,
        headers=headers,
    )
    assert survey_res.status_code == 200
    survey_id = survey_res.json()["data"]["survey_id"]

    # Verify lead status moved to Site Survey
    lead_check = client.get(f"/api/v1/leads/{lead_id}", headers=headers)
    assert lead_check.json()["data"]["status"] == "Site Survey"

    # Verify site survey in database
    get_survey = client.get(f"/api/v1/site-surveys/{survey_id}", headers=headers)
    assert get_survey.status_code == 200
    assert get_survey.json()["data"]["customer_id"] == customer_id
    assert get_survey.json()["data"]["status"] == "Scheduled"

    # 4. Update survey status: Scheduled -> Completed
    update_survey = client.patch(
        f"/api/v1/site-surveys/{survey_id}",
        json={"status": "Completed"},
        headers=headers,
    )
    assert update_survey.status_code == 200
    assert update_survey.json()["data"]["status"] == "Completed"

    # Verify lead reflects progress to Quoted
    lead_quoted = client.get(f"/api/v1/leads/{lead_id}", headers=headers)
    assert lead_quoted.json()["data"]["status"] == "Quoted"

    # 5. Convert lead to Project
    convert_res = client.post(
        f"/api/v1/leads/{lead_id}/convert",
        json={
            "project_name": "Devendra Patil 12kW Rooftop Solar",
            "capacity": "12 kW",
            "capacity_kw": 12.0,
            "estimated_cost": 480000.0,
        },
        headers=headers,
    )
    assert convert_res.status_code == 200
    project_id = convert_res.json()["data"]["project_id"]
    assert project_id is not None

    # Verify project has foreign keys: customer_id and source_lead_id
    proj_res = client.get(f"/api/v1/projects/{project_id}", headers=headers)
    assert proj_res.status_code == 200
    proj_data = proj_res.json()["data"]
    assert proj_data["customer_id"] == customer_id
    assert proj_data["source_lead_id"] == lead_id
    assert proj_data["customer_name"] == "Devendra Patil"

    # Verify lead shows Converted
    lead_converted = client.get(f"/api/v1/leads/{lead_id}", headers=headers)
    assert lead_converted.json()["data"]["status"] == "Converted"

    # Verify duplicate prevention: calling convert again returns existing project
    repeat_convert = client.post(
        f"/api/v1/leads/{lead_id}/convert",
        headers=headers,
    )
    assert repeat_convert.status_code == 200
    assert repeat_convert.json()["data"]["project_id"] == project_id

    # 6. Check customer overview contains all linked entities
    overview_res = client.get(f"/api/v1/customers/{customer_id}/overview", headers=headers)
    assert overview_res.status_code == 200
    overview = overview_res.json()["data"]
    assert overview["id"] == customer_id
    assert overview["total_projects"] == 1
    assert len(overview["leads"]) >= 1
    assert overview["leads"][0]["id"] == lead_id
    assert len(overview["site_surveys"]) >= 1
    assert overview["site_surveys"][0]["id"] == survey_id
    assert len(overview["projects"]) >= 1
    assert overview["projects"][0]["id"] == project_id
    assert len(overview["activities"]) >= 3

    # 7. Update project to Completed
    proj_complete = client.patch(
        f"/api/v1/projects/{project_id}",
        json={"status": "Completed", "actual_cost": 475000.0},
        headers=headers,
    )
    assert proj_complete.status_code == 200
    assert proj_complete.json()["data"]["status"] == "Completed"

    # 8. Check Dashboard Summary reflects real database updates
    dash_res = client.get("/api/v1/dashboard/summary", headers=headers)
    assert dash_res.status_code == 200
    dash_data = dash_res.json()
    metrics = dash_data["metrics"]
    assert metrics["convertedLeads"] >= 1
    assert metrics["completedProjects"] >= 1
    assert metrics["completedSurveys"] >= 1

    # 9. Check Activity Feed
    act_res = client.get("/api/v1/dashboard/activities", headers=headers)
    assert act_res.status_code == 200
    activities = act_res.json()["data"]
    assert len(activities) >= 4
    # Ensure Devendra Patil is in activities
    patil_acts = [a for a in activities if "Devendra Patil" in (a["title"] or "") or "Devendra Patil" in (a["customer_name"] or "")]
    assert len(patil_acts) >= 1
