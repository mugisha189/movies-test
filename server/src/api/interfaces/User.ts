import { IUser } from "../models";

export type NewUser = Omit<IUser, "role">;

export type LoginUser = Pick<IUser, "email" | "password">;

export type PublicUser = Omit<NewUser, "password">;
