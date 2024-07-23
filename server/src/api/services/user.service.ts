import bcrypt from "bcryptjs";
import { User } from "../models";
import { NewUser } from "../interfaces/User";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";

const createUser = async (body: NewUser) => {
  console.log(body)
  const existingUser = await User.findOne({ where: { email: body.email } });
  if (existingUser) {
    throw new APIError(status.CONFLICT, "Email already taken");
  }
  const passwordHash = await bcrypt.hash(body.password || "Default123", config.BCRYPT_SALT);
  const newUser = await User.create({ ...body, password: passwordHash });
  return newUser;
};

const getUserById = (id: number) => {
  return User.findByPk(id);
};

const getAllUsers = async () => {
  return User.findAll({
    where: {
      role: "User",
    },
  });
};

const updateUser = async (id: number, updateData: Partial<NewUser>) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  await User.update(updateData, { where: { id } });
  return User.findByPk(id);
};

const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new APIError(status.NOT_FOUND, "User not found");
  }
  await user.destroy();
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
