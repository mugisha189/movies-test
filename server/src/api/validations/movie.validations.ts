// src/validations/categoryValidation.ts

import Joi from "joi";

export default {
  createMovie: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    publishingYear: Joi.string().required(),
  }),
  updateMovie: Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().optional(),
    publishingYear: Joi.string().optional(),
  }),
};
