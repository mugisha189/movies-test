import express from "express";
import { userController } from "../controllers";
import validator from "../middlewares/validator";
import { idValidation, userValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123!
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 email:
 *                   type: string
 *                   description: User email
 *       400:
 *         description: Bad request, validation errors
 *     tags:
 *       - Users
 */
router.post(
  "/",
  validator.body(userValidations.newUser),
  userController.createUser
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 email:
 *                   type: string
 *                   description: User email
 *       404:
 *         description: User not found
 *     tags:
 *       - Users
 */
router.get(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  userController.getUserById
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   email:
 *                     type: string
 *                     description: User email
 *                   name:
 *                     type: string
 *                     description: User name
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.get("/", accessControl(), userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Updates user details by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123!
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 email:
 *                   type: string
 *                   description: User email
 *       400:
 *         description: Bad request, validation errors
 *       404:
 *         description: User not found
 *     tags:
 *       - Users
 */
router.put(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  validator.body(userValidations.updateUser),
  userController.updateUser
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *     tags:
 *       - Users
 */
router.delete(
  "/:id",
  accessControl(),
  validator.params({ id: idValidation }),
  userController.deleteUser
);

export default router;
