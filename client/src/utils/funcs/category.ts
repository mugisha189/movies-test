import { toast } from "react-toastify";
import { authorizedApi } from "../api";
import { Category } from "../types/category";

export const createCategory = async (
  category: Partial<Category>,
  callback?: () => void
): Promise<Category | void> => {
  try {
    const response = await authorizedApi.post("/categories", category);
    toast.success("Category created successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while creating the category. Please try again later."
    );
  }
};

export const updateCategory = async (
  category: Partial<Category>,
  id: string,
  callback?: () => void
): Promise<Category | void> => {
  try {
    const response = await authorizedApi.put(`/categories/${id}`, category);
    toast.success("Category updated successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while updating the category. Please try again later."
    );
  }
};

export const deleteCategory = async (
  id: string,
  callback?: () => void
): Promise<void> => {
  try {
    await authorizedApi.delete(`/categories/${id}`);
    toast.success("Category deleted successfully");
    callback && callback();
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while deleting the category. Please try again later."
    );
  }
};
