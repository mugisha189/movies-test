import { User } from "../models";
import APIError from "../helpers/APIError";
import status from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config/config";
import { NewUser } from "../interfaces/User";
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
  const user = await User.findOne({ where: { email } });
  if (!user) throw new APIError(status.UNAUTHORIZED, "User does not exist");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    throw new APIError(status.UNAUTHORIZED, "Incorrect password");

  return {
    accessToken: createAccessToken({
      id: user.id.toString(),
      email: user.email,
    }),
    refreshToken: createRefreshToken({
      id: user.id.toString(),
      email: user.email,
    }),
    user: user,
  };
};

const refreshToken = async (token: string) => {
  const user = verifyAuthToken(token) as Payload;
  if (!user) throw new APIError(status.UNAUTHORIZED, "Unauthorized");
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

const register = async (body: NewUser) => {
  const user = await userService.createUser(body);
  return {
    accessToken: createAccessToken({
      id: user.id.toString(),
      email: user.email,
    }),
    refreshToken: createRefreshToken({
      id: user.id.toString(),
      email: user.email,
    }),
    user: user,
  };
};

export default {
  login,
  register,
  refreshToken,
};
