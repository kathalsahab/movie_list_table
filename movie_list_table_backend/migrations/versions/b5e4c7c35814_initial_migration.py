"""Initial Migration

Revision ID: b5e4c7c35814
Revises: 
Create Date: 2021-11-12 23:30:09.874692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5e4c7c35814'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movies',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('release_date', sa.DateTime(), nullable=True),
    sa.Column('genre', sa.String(length=255), nullable=False),
    sa.Column('price', sa.DECIMAL(10,5), nullable=True),
    sa.Column('rating', sa.DECIMAL(10,5), nullable=True),
    sa.Column('created_date', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('modified_date', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), nullable=True),
    sa.PrimaryKeyConstraint('movie_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('movies')
    # ### end Alembic commands ###
