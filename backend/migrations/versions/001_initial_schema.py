"""Initial schema migration

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-09-23 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=50), nullable=True),
        sa.Column('role', sa.String(length=50), nullable=False, server_default='Sales Rep'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='Active'),
        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)

    # 2. Customers table
    op.create_table(
        'customers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('contact', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('phone', sa.String(length=50), nullable=True),
        sa.Column('location', sa.String(length=150), nullable=False),
        sa.Column('property_type', sa.String(length=50), nullable=False, server_default='Residential'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='Active'),
        sa.Column('customer_since', sa.String(length=50), nullable=True),
        sa.Column('assigned_user_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['assigned_user_id'], ['users.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_customers_id'), 'customers', ['id'], unique=False)

    # 3. Leads table
    op.create_table(
        'leads',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('contact', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('phone', sa.String(length=50), nullable=True),
        sa.Column('location', sa.String(length=150), nullable=False),
        sa.Column('property_type', sa.String(length=50), nullable=False, server_default='Residential'),
        sa.Column('source', sa.String(length=100), nullable=False, server_default='Website'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='New'),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('estimated_value', sa.Float(), nullable=True),
        sa.Column('assigned_user_id', sa.Integer(), nullable=True),
        sa.Column('customer_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['assigned_user_id'], ['users.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_leads_id'), 'leads', ['id'], unique=False)

    # 4. Projects table
    op.create_table(
        'projects',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.Column('category', sa.String(length=50), nullable=False),
        sa.Column('location', sa.String(length=150), nullable=False),
        sa.Column('capacity', sa.String(length=50), nullable=False),
        sa.Column('capacity_kw', sa.Float(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='In Progress'),
        sa.Column('customer_id', sa.Integer(), nullable=True),
        sa.Column('assigned_user_id', sa.Integer(), nullable=True),
        sa.Column('image_url', sa.String(length=500), nullable=True),
        sa.Column('is_public', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('estimated_cost', sa.Float(), nullable=True),
        sa.Column('actual_cost', sa.Float(), nullable=True),
        sa.Column('start_date', sa.Date(), nullable=True),
        sa.Column('completion_date', sa.Date(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['assigned_user_id'], ['users.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_projects_id'), 'projects', ['id'], unique=False)

    # 5. Site Surveys table
    op.create_table(
        'site_surveys',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('customer_name', sa.String(length=150), nullable=False),
        sa.Column('location', sa.String(length=150), nullable=False),
        sa.Column('property_type', sa.String(length=50), nullable=False, server_default='Residential'),
        sa.Column('survey_date', sa.String(length=50), nullable=False),
        sa.Column('time_slot', sa.String(length=50), nullable=False),
        sa.Column('assigned_to', sa.String(length=100), nullable=False, server_default='Rahul'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='Scheduled'),
        sa.Column('customer_id', sa.Integer(), nullable=True),
        sa.Column('assigned_user_id', sa.Integer(), nullable=True),
        sa.Column('roof_information', sa.Text(), nullable=True),
        sa.Column('capacity_estimate', sa.String(length=50), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['assigned_user_id'], ['users.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_site_surveys_id'), 'site_surveys', ['id'], unique=False)

    # 6. Blogs table
    op.create_table(
        'blogs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('slug', sa.String(length=255), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=False, server_default='Guides'),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='Draft'),
        sa.Column('author', sa.String(length=100), nullable=False, server_default='Admin'),
        sa.Column('author_id', sa.Integer(), nullable=True),
        sa.Column('date', sa.String(length=50), nullable=True),
        sa.Column('excerpt', sa.Text(), nullable=True),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('cover_image', sa.String(length=500), nullable=True),
        sa.Column('read_time', sa.String(length=50), nullable=True, server_default='5 min read'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['author_id'], ['users.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_blogs_id'), 'blogs', ['id'], unique=False)
    op.create_index(op.f('ix_blogs_slug'), 'blogs', ['slug'], unique=True)

    # 7. FAQs table
    op.create_table(
        'faqs',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('question', sa.String(length=500), nullable=False),
        sa.Column('answer', sa.Text(), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=True, server_default='General'),
        sa.Column('display_order', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('is_published', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_faqs_id'), 'faqs', ['id'], unique=False)

    # 8. Calculator Submissions table
    op.create_table(
        'calculator_submissions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('phone', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('property_type', sa.String(length=50), nullable=False, server_default='Residential'),
        sa.Column('monthly_bill', sa.Float(), nullable=False),
        sa.Column('roof_area', sa.Float(), nullable=False),
        sa.Column('system_size_kw', sa.Float(), nullable=False),
        sa.Column('annual_savings', sa.Float(), nullable=False),
        sa.Column('payback_years', sa.Float(), nullable=True),
        sa.Column('co2_tons', sa.Float(), nullable=True),
        sa.Column('date', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_calculator_submissions_id'), 'calculator_submissions', ['id'], unique=False)

    # 9. Calculator Settings table
    op.create_table(
        'calculator_settings',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('electricity_rate', sa.Float(), nullable=False, server_default='8.0'),
        sa.Column('generation_per_kw', sa.Float(), nullable=False, server_default='120.0'),
        sa.Column('installation_cost_per_kw', sa.Float(), nullable=False, server_default='55000.0'),
        sa.Column('bill_offset_percent', sa.Float(), nullable=False, server_default='85.0'),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_calculator_settings_id'), 'calculator_settings', ['id'], unique=False)

    # 10. System Settings table
    op.create_table(
        'system_settings',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('company_name', sa.String(length=200), nullable=False, server_default='SOLARA Energy Solutions'),
        sa.Column('support_email', sa.String(length=255), nullable=False, server_default='support@solara.com'),
        sa.Column('email_notifications', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('sms_notifications', sa.Boolean(), nullable=False, server_default='0'),
        sa.Column('lead_alerts', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('two_factor_auth', sa.Boolean(), nullable=False, server_default='0'),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_system_settings_id'), 'system_settings', ['id'], unique=False)


def downgrade() -> None:
    op.drop_table('system_settings')
    op.drop_table('calculator_settings')
    op.drop_table('calculator_submissions')
    op.drop_table('faqs')
    op.drop_table('blogs')
    op.drop_table('site_surveys')
    op.drop_table('projects')
    op.drop_table('leads')
    op.drop_table('customers')
    op.drop_table('users')
