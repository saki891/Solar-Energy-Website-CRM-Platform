"""Add optional project relationship to site surveys

Revision ID: 002_add_site_survey_project_relationship
Revises: 001_initial_schema
Create Date: 2026-09-23 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "002_site_survey_project"
down_revision: Union[str, None] = "001_initial_schema"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("site_surveys") as batch_op:
        batch_op.add_column(sa.Column("project_id", sa.Integer(), nullable=True))
        batch_op.create_index("ix_site_surveys_project_id", ["project_id"])
        batch_op.create_foreign_key(
            "fk_site_surveys_project_id_projects",
            "projects",
            ["project_id"],
            ["id"],
            ondelete="SET NULL",
        )


def downgrade() -> None:
    with op.batch_alter_table("site_surveys") as batch_op:
        batch_op.drop_constraint("fk_site_surveys_project_id_projects", type_="foreignkey")
        batch_op.drop_index("ix_site_surveys_project_id")
        batch_op.drop_column("project_id")
