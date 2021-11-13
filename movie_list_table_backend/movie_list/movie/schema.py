"""Movie Schema
"""
from marshmallow import fields
from movie_list.extensions import mm
from movie_list.design.models import Genre, Movies


class MoviesSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Movies

    genre_name = fields.String()


movie_list_schema_list = MoviesSchema(many=True)
movie_list_schema_single = MoviesSchema()


class GenreSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Genre
