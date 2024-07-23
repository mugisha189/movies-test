import sequelize from "../db";
import { User } from "../models";
import bcrypt from "bcryptjs";
import config from "../../config/config";

const seedData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    const passwordHash = await bcrypt.hash("Admin123", config.BCRYPT_SALT);
    const adminUser = await User.create({
      name: "Admin",
      surname: "User",
      birthdate: new Date(),
      sex: "Male",
      role: "ADMIN",
      email: "admin@app.com",
      password: passwordHash,
    });
    console.log(`Admin user created: ${adminUser.email}`);
    console.log("Data seeding completed");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await sequelize.close();
  }
};

seedData();



