import bcrypt from "bcryptjs";
import User from "../models/User";
import APIError from "../helpers/APIError";
import status from "http-status";
import {
  Payload,
  createAccessToken,
  createRefreshToken,
  verifyAuthToken,
} from "../helpers/authToken";
import userService from "./user.service";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) throw new APIError(status.UNAUTHORIZED, "User does not exist");

  // Check if the password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    throw new APIError(status.UNAUTHORIZED, "Incorrect password");

  // Generate access and refresh tokens
  return {
    accessToken: createAccessToken({
      id: user._id.toString(),
      email: user.email,
    }),
    refreshToken: createRefreshToken({
      id: user._id.toString(),
      email: user.email,
    }),
    user: user,
  };
};

const refreshToken = async (token: string) => {
  // Verify the provided token
  const user = verifyAuthToken(token) as Payload;
  if (!user) throw new APIError(status.UNAUTHORIZED, "Unauthorized");

  // Generate new access and refresh tokens
  return {
    accessToken: createAccessToken({
      id: user.id.toString(),
      email: user.email,
    }),
    refreshToken: createRefreshToken({
      id: user.id.toString(),
      email: user.email,
    }),
  };
};


export default {
  login,
  refreshToken,
};
