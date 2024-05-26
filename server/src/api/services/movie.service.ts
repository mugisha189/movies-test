// src/services/movieService.ts

import Movie from "../models/Movie";
import APIError from "../helpers/APIError";
import status from "http-status";

const createMovie = async (body: {
  title: string;
  image: string;
  publishingYear: string;
}) => {
  const existingMovie = await Movie.findOne({ title: body.title });
  if (existingMovie) {
    throw new APIError(status.CONFLICT, "Movie already exists");
  }
  const movie = new Movie(body);
  return movie.save();
};

const getMovieById = (id: string) => {
  return Movie.findById(id);
};

const getAllMovies = () => {
  return Movie.find();
};

const updateMovie = async (
  id: string,
  updateData: { title?: string; image?: string; publishingYear?: string }
) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new APIError(status.NOT_FOUND, "Movie not found");
  }
  Object.assign(movie, updateData);
  return movie.save();
};

const deleteMovie = async (id: string) => {
  await Movie.findByIdAndDelete(id);
  return;
};

export default {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
};
