import { Schema, model, Model, Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserMethods {
  toJsonWithoutPassword(): Partial<Document<IUser>>;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const schema = new Schema<IUser, UserModel>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.index({
  username: "text",
});

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

schema.method("toJsonWithoutPassword", function toJsonWithoutPassword() {
  const userObject: any = this.toJSON();
  const { password, ...userWithoutPassword } = userObject;
  return userWithoutPassword;
});

const User = model<IUser, UserModel>("User", schema);

export default User;
