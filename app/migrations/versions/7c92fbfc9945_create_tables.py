"""Create Tables

Revision ID: 7c92fbfc9945
Revises: 
Create Date: 2024-03-03 17:34:35.172126

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c92fbfc9945'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Billing_Details',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('detail', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Photo',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('token_blocklist',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('jti', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_token_blocklist_jti'), ['jti'], unique=False)

    op.create_table('user',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('role', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Billing_Info',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('payment_method', sa.Enum('credit_card', 'm_pesa', 'airtel_money', 'Mpesa', name='Ptype'), nullable=True),
    sa.Column('payment_details_id', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['payment_details_id'], ['Billing_Details.id'], name=op.f('fk_Billing_Info_payment_details_id_Billing_Details')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Billing_Info_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Event',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('organiser_id', sa.String(), nullable=True),
    sa.Column('start_date', sa.String(), nullable=True),
    sa.Column('start_time', sa.String(), nullable=True),
    sa.Column('end_date', sa.String(), nullable=True),
    sa.Column('end_time', sa.String(), nullable=True),
    sa.Column('duration', sa.String(), nullable=True),
    sa.Column('venue', sa.String(), nullable=True),
    sa.Column('confirmed', sa.Boolean(), nullable=True),
    sa.Column('photo_id', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['organiser_id'], ['user.id'], name=op.f('fk_Event_organiser_id_user')),
    sa.ForeignKeyConstraint(['photo_id'], ['Photo.id'], name=op.f('fk_Event_photo_id_Photo')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Profile',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('profile_photo', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Profile_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Advert_Fees',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_Advert_Fees_event_id_Event')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Advert_Fees_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Interests',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_Interests_event_id_Event')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Interests_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Pricing',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_Pricing_event_id_Event')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Review',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_Review_event_id_Event')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Review_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_tag_event_id_Event')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_tag_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Booking',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('event_id', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('pricing_id', sa.String(), nullable=True),
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['Event.id'], name=op.f('fk_Booking_event_id_Event')),
    sa.ForeignKeyConstraint(['pricing_id'], ['Pricing.id'], name=op.f('fk_Booking_pricing_id_Pricing')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_Booking_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Booking')
    op.drop_table('tag')
    op.drop_table('Review')
    op.drop_table('Pricing')
    op.drop_table('Interests')
    op.drop_table('Advert_Fees')
    op.drop_table('Profile')
    op.drop_table('Event')
    op.drop_table('Billing_Info')
    op.drop_table('user')
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_blocklist_jti'))

    op.drop_table('token_blocklist')
    op.drop_table('Photo')
    op.drop_table('Billing_Details')
    # ### end Alembic commands ###