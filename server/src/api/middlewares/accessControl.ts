import { Response, NextFunction } from "express";
import { Payload, verifyAuthToken } from "../helpers/authToken";
import APIError from "../helpers/APIError";
import status from "http-status";
import { ITokenRequest } from "./tokenGetter";

export interface IUserRequest extends ITokenRequest {
  user?: Payload;
}
export default function accessControl() {
  return function callBack(req: IUserRequest, _: Response, next: NextFunction) {
    try {
      const token = req.token;
      if (!token) throw new APIError(status.UNAUTHORIZED, `Invalid token`);
      const payload = verifyAuthToken(token) as Payload;
      req.user = payload;
      next();
    } catch (err) {
      next(err);
    }
  };
}
