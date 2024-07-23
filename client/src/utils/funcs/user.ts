import { toast } from "react-toastify";
import { authorizedApi } from "../api";
import { User } from "../types/user";
export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const createUser = async (
  user: Partial<User>,
  callback?: () => void
): Promise<User | void> => {
  try {
    const response = await authorizedApi.post("/users", user);
    toast.success("User created successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while creating the user. Please try again later."
    );
  }
};

export const updateUser = async (
  user: Partial<User>,
  id: string,
  callback?: () => void
): Promise<User | void> => {
  try {
    console.log(id)
    const response = await authorizedApi.put(`/users/${id}`, user);
    toast.success("User updated successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while updating the user. Please try again later."
    );
  }
};

export const deleteUser = async (
  id: string,
  callback?: () => void
): Promise<void> => {
  try {
    await authorizedApi.delete(`/users/${id}`);
    toast.success("User deleted successfully");
    callback && callback();
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while deleting the user. Please try again later."
    );
  }
};
