// src/routes/movieRouter.ts

import express from "express";
import { movieController } from "../controllers";
import validator from "../middlewares/validator";
import { idValidation, movieValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// Create Movie
router.post(
  "/",
  validator.body(movieValidations.createMovie),
  movieController.createMovie
);

// Read Movie by ID
router.get(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  movieController.getMovieById
);

// Read All Movies
router.get("/", accessControl("ALL"), movieController.getAllMovies);

// Update Movie by ID
router.put(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(movieValidations.updateMovie),
  movieController.updateMovie
);

// Delete Movie by ID
router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  movieController.deleteMovie
);

export default router;
