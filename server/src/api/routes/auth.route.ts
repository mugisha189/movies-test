import express from "express";
import { authController } from "../controllers";
import validator from "../middlewares/validator";
import { authValidation, userValidations } from "../validations";

const router = express.Router();

router.post(
  "/login",
  validator.body(authValidation.login),
  authController.login
);

router.post(
  "/register",
  validator.body(userValidations.newUser),
  authController.register
);

router.post(
  "/refresh-token",
  validator.body(authValidation.refreshToken),
  authController.refreshToken
);

export default router;
