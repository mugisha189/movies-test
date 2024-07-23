import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import status from "http-status";
import APIError from "../helpers/APIError";
import { uploadToCloudinary } from "../helpers/cloudinary";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { photo, ...otherData } = req.body;
    const newUserData = { ...otherData };
    if (photo) {
      const uploadedImage = await uploadToCloudinary(photo, "user-photos");
      newUserData.photo = uploadedImage;
    }
    const newUser = await userService.createUser(newUserData);
    res.status(status.CREATED).json(newUser);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    if (!user) throw new APIError(status.NOT_FOUND, "User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { photo, ...otherData } = req.body;
    const updatedUser = { ...otherData };
    if (photo) {
      const uploadedImage = await uploadToCloudinary(photo, "user-photos");
      updatedUser.photo = uploadedImage;
    }
    console.log(updatedUser)
    const user = await userService.updateUser(
      parseInt(req.params.id),
      updatedUser
    );
    if (!user) throw new APIError(status.NOT_FOUND, "User not found");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(parseInt(req.params.id));
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
