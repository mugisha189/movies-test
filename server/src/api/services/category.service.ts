// src/services/categoryService.ts

import { Category } from "../models";
import APIError from "../helpers/APIError";
import status from "http-status";

const createCategory = async (body: { name: string }) => {
  const existingCategory = await Category.findOne({
    where: { name: body.name },
  });
  if (existingCategory) {
    throw new APIError(status.CONFLICT, "Category already exists");
  }
  return Category.create(body);
};

const getCategoryById = (id: number) => {
  return Category.findByPk(id);
};

const getAllCategories = () => {
  return Category.findAll();
};

const updateCategory = async (id: number, updateData: { name: string }) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new APIError(status.NOT_FOUND, "Category not found");
  }
  return category.update(updateData);
};

const deleteCategory = async (id: number) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new APIError(status.NOT_FOUND, "Category not found");
  }
  await category.destroy();
};

export default {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
