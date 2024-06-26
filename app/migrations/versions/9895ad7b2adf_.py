"""empty message

Revision ID: 9895ad7b2adf
Revises: 7c92fbfc9945
Create Date: 2024-06-17 17:14:38.143346

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9895ad7b2adf'
down_revision = '7c92fbfc9945'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.drop_index('ix_token_blocklist_jti')
        batch_op.create_index(batch_op.f('ix_token_blocklist_jti'), ['jti'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('token_blocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_token_blocklist_jti'))
        batch_op.create_index('ix_token_blocklist_jti', ['jti'], unique=False)

    # ### end Alembic commands ###
