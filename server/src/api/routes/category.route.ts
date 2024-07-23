// src/routes/categoryRouter.ts

import express from "express";
import { categoryController } from "../controllers";
import validator from "../middlewares/validator";
import { categoryValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// Create Category
router.post(
  "/",
  validator.body(categoryValidations.createCategory),
  categoryController.createCategory
);

// Read Category by ID
router.get(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: categoryValidations.categoryId }),
  categoryController.getCategoryById
);

// Read All Categories
router.get("/", accessControl("ALL"), categoryController.getAllCategories);

// Update Category by ID
router.put(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: categoryValidations.categoryId }),
  validator.body(categoryValidations.updateCategory),
  categoryController.updateCategory
);

// Delete Category by ID
router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: categoryValidations.categoryId }),
  categoryController.deleteCategory
);

export default router;
