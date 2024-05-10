import express from "express";
import { authController } from "../controllers";
import validator from "../middlewares/validator";
import { authValidation, userValidations } from "../validations";

const router = express.Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns access and refresh tokens.
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
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *                 user:
 *                   type: object
 *                   description: User object
 *       401:
 *         description: Unauthorized, invalid email or password
 *     tags:
 *       - Authentication
 */
router.post(
  "/login",
  validator.body(authValidation.login),
  authController.login
);


/**
 * @openapi
 * /refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Refreshes the access token using the provided refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: refreshToken123!
 *     responses:
 *       200:
 *         description: Successfully refreshed token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *                 refreshToken:
 *                   type: string
 *                   description: New refresh token
 *       401:
 *         description: Unauthorized, invalid refresh token
 *     tags:
 *       - Authentication
 */
router.post(
  "/refresh-token",
  validator.body(authValidation.refreshToken),
  authController.refreshToken
);

export default router;
