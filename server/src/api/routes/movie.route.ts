import express from "express";
import { movieController } from "../controllers";
import validator from "../middlewares/validator";
import { idValidation, movieValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Creates a new movie with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "data://png..."
 *               publishingYear:
 *                 type: string
 *                 example: "2010"
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Movie ID
 *                 title:
 *                   type: string
 *                   description: Movie title
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL of the movie image
 *                 publishingYear:
 *                   type: string
 *                   description: Year the movie was published
 *       400:
 *         description: Bad request, validation errors
 *     tags:
 *       - Movies
 */
router.post(
  "/",
  validator.body(movieValidations.createMovie),
  movieController.createMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     description: Retrieves a movie by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Movie ID
 *                 title:
 *                   type: string
 *                   description: Movie title
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL of the movie image
 *                 publishingYear:
 *                   type: string
 *                   description: Year the movie was published
 *       404:
 *         description: Movie not found
 *     tags:
 *       - Movies
 */
router.get(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  movieController.getMovieById
);

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieves a paginated list of all movies.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number to retrieve
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of movies to return per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of movies
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of movies per page
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Movie ID
 *                       title:
 *                         type: string
 *                         description: Movie title
 *                       image:
 *                         type: string
 *                         format: uri
 *                         description: URL of the movie image
 *                       publishingYear:
 *                         type: string
 *                         description: Year the movie was published
 *       400:
 *         description: Invalid pagination parameters
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Movies
 */
router.get("/", accessControl(), movieController.getAllMovies);

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update movie by ID
 *     description: Updates a movie by its ID with the provided details.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "http://example.com/image.jpg"
 *               publishingYear:
 *                 type: string
 *                 example: "2010"
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Movie ID
 *                 title:
 *                   type: string
 *                   description: Movie title
 *                 image:
 *                   type: string
 *                   format: uri
 *                   description: URL of the movie image
 *                 publishingYear:
 *                   type: string
 *                   description: Year the movie was published
 *       400:
 *         description: Bad request, validation errors
 *       404:
 *         description: Movie not found
 *     tags:
 *       - Movies
 */
router.put(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  validator.body(movieValidations.updateMovie),
  movieController.updateMovie
);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie by ID
 *     description: Deletes a movie by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *     tags:
 *       - Movies
 */
router.delete(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  movieController.deleteMovie
);

export default router;
