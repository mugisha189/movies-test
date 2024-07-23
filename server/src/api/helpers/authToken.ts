import jwt from "jsonwebtoken";
import config from "../../config/config";
export interface Payload {
  id: string;
  email: string;
}

export const createAccessToken = (payload: Payload) => {
  console.log(config.JWT_SECRET + "creating");
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (payload: Payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAuthToken = (token: string) => {
  console.log(token);
  console.log(config.JWT_SECRET + "verifying");
  const data = jwt.verify(token, config.JWT_SECRET);
  console.log(data);
  return data;
};
