// src/controllers/categoryController.ts

import { Request, Response, NextFunction } from "express";
import { categoryService } from "../services";
import APIError from "../helpers/APIError";
import status from "http-status";
import { uploadToCloudinary } from "../helpers/cloudinary";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, iconWhite, iconBlack } = req.body;
    const uploadedWhite = await uploadToCloudinary(iconWhite, "category-icons");
    const uploadedBlack = await uploadToCloudinary(iconBlack, "category-icons");
    const newCategoryData = {
      iconBlack: uploadedBlack,
      name,
      iconWhite: uploadedWhite,
    };
    const newCategory = await categoryService.createCategory(newCategoryData);
    res.status(status.CREATED).json(newCategory);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategoryById(
      parseInt(req.params.id)
    );
    if (!category) {
      throw new APIError(status.NOT_FOUND, "Category not found");
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { iconWhite, iconBlack, ...otherData } = req.body;
    const newCategoryData = { ...otherData };
    if (iconWhite) {
      const uploadedImage = await uploadToCloudinary(
        iconWhite,
        "category-icons"
      );
      newCategoryData.iconWhite = uploadedImage;
    }
    if (iconBlack) {
      const uploadedImage = await uploadToCloudinary(
        iconBlack,
        "category-icons"
      );
      newCategoryData.iconBlack = uploadedImage;
    }
    const updatedCategory = await categoryService.updateCategory(
      parseInt(req.params.id),
      newCategoryData
    );
    res.json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await categoryService.deleteCategory(parseInt(req.params.id));
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

export default {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
