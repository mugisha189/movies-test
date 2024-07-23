import { Request, Response, NextFunction } from "express";
import { authService, userService } from "../services";
import status from "http-status";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authBody = await authService.login(req.body);
    res.status(status.OK).json(authBody);
  } catch (err) {
    next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const account = await authService.register(body);
    res.status(status.CREATED).json(account);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const tokens = await authService.refreshToken(token);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  register,
  refreshToken,
};
