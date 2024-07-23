export interface User {
  id: number;
  name: string;
  surname: string;
  birthdate: Date;
  sex: string;
  photo: string;
  password: string;
  email: string;
  role: "Admin" | "User";
  createdAt: Date;
  updatedAt: Date;
}
