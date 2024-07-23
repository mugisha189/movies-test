import express from "express";
import { userController } from "../controllers";
import validator from "../middlewares/validator";
import { idValidation, userValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// Create User
router.post(
  "/",
  validator.body(userValidations.newUser),
  userController.createUser
);

// Read User by ID
router.get(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  userController.getUserById
);

// Read All Users
router.get("/", accessControl("ALL"), userController.getAllUsers);

// Update User by ID
router.put(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(userValidations.updateUser),
  userController.updateUser
);

// Delete User by ID
router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  userController.deleteUser
);

export default router;
