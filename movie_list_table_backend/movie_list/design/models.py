"""Centralised location for all the DB Models
"""
from sqlalchemy.sql.expression import text

# Third party imports
from sqlalchemy import (
    Integer,
    Column,
    DateTime,
    String,
)
from sqlalchemy.sql.sqltypes import DECIMAL

# Application imports
from movie_list.extensions import db
from movie_list.utils import RecordNotFound
from sqlalchemy.types import String


class Movies(db.Model):
   __tablename__ = "movies"

   movie_id = Column(Integer, primary_key=True)
   title = Column(String(255), nullable=False)
   release_date = Column(Integer)
   genre = Column(String(255), nullable=False)
   price = Column(DECIMAL)
   rating = Column(DECIMAL)
   created_date = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
   modified_date = Column(
      DateTime, server_default=text("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
   )

   @classmethod
   def lookup(cls, title):
      return cls.query.filter_by(
         title=title
      ).first()

   @staticmethod
   def create_movie(
      title, release_date, genre, price=None,rating=None
   ):
      movie = Movies.query.filter_by(
         title = title
      ).first()
      if movie:
         return
      movie = Movies()
      movie.title = title
      movie.release_date = release_date
      movie.genre = genre
      if price:
         movie.price = price
      if rating:
         movie.rating = rating
      db.session.add(movie)
      return movie

   @staticmethod
   def update_movie(
      movie_id,title, release_date, genre, price=None,rating=None
   ):
      movie = Movies.query.filter_by(movie_id=movie_id).first()
      if not movie:
         raise RecordNotFound
      if title:
         movie.title = title
      if release_date:
         movie.release_date = release_date
      if genre:
         movie.genre = genre
      if price:
         movie.price = price
      if rating:
         movie.rating = rating
      db.session.add(movie)
      return movie