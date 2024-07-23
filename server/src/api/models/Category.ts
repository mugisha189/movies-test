// src/models/Category.ts

import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class Category extends Model {
  public id!: number;
  public name!: string;
  public iconWhite!: string;
  public iconBlack!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    iconWhite: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    iconBlack: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
  }
);

export default Category;
