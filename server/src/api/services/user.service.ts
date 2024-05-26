import bcrypt from "bcryptjs";
import User from "../models/User";
import { NewUser } from "../interfaces/User";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";

// Create a new user
const createUser = async (body: NewUser) => {
  console.log(body);

  // Check if the user with the given email already exists
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    throw new APIError(status.CONFLICT, "Email already taken");
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(
    body.password || "Default123",
    config.BCRYPT_SALT
  );

  // Create and save the new user
  const newUser = new User({ ...body, password: passwordHash });
  await newUser.save();
  return newUser;
};

// Get a user by ID
const getUserById = async (id: string) => {
  return User.findById(id);
};

// Get all users with a specific role
const getAllUsers = async () => {
  return User.find({ role: "User" });
};

// Update a user by ID
const updateUser = async (id: string, updateData: Partial<NewUser>) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(
      updateData.password,
      config.BCRYPT_SALT
    );
  }

  // Find and update the user
  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new APIError(status.NOT_FOUND, "User not found");
  }
  return user;
};

// Delete a user by ID
const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new APIError(status.NOT_FOUND, "User not found");
  }

  await User.findByIdAndDelete(id);
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
