// src/validations/categoryValidation.ts

import Joi from "joi";

export default {
  createCategory: Joi.object({
    name: Joi.string().required(),
    iconBlack: Joi.string().required(),
    iconWhite: Joi.string().required(),
  }),
  updateCategory: Joi.object({
    name: Joi.string().optional(),
    iconBlack: Joi.string().optional(),
    iconWhite: Joi.string().optional(),
  }),
  categoryId: Joi.number().integer().positive().required(),
};
