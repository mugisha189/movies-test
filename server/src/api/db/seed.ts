// seed.ts

import mongoose from "mongoose";
import config from "../../config/config";
import User from "../models/User";
import bcrypt from "bcryptjs";

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    seedUser();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const seedUser = async () => {
  try {
    const userEmail = "user@gmail.com";
    const userPassword = "User@12345";

    // Check if the user already exists
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      console.log(`User already exists: ${userEmail}`);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create and save the new user
    const newUser = new User({
      email: userEmail,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(`Inserted user: ${userEmail}`);
  } catch (err) {
    console.error("Error seeding user data:", err);
  } finally {
    mongoose.connection.close();
  }
};
