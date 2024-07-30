// src/controllers/movieController.ts

import { Request, Response, NextFunction } from "express";
import { movieService } from "../services";
import APIError from "../helpers/APIError";
import status from "http-status";
import { uploadToCloudinary } from "../helpers/cloudinary";

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image, ...otherData } = req.body;
    const uploadedImage = await uploadToCloudinary(image, "movie-images");
    const newMovieData = {
      ...otherData,
      image: uploadedImage,
    };
    const newMovie = await movieService.createMovie(newMovieData);
    res.status(status.CREATED).json(newMovie);
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      throw new APIError(status.NOT_FOUND, "Movie not found");
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }
    const movies = await movieService.getAllMovies(pageNumber, limitNumber);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};


const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image, ...otherData } = req.body;
    const newMovieData = { ...otherData };
    if (image) {
      const uploadedImage = await uploadToCloudinary(image, "movie-images");
      newMovieData.image = uploadedImage;
    }
    const updatedMovie = await movieService.updateMovie(
      req.params.id,
      newMovieData
    );
    res.json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

export default {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
};
