import { Schema, model, Model, Document } from "mongoose";

export interface IMovie {
  title: string;
  image: string;
  publishingYear: string;
}

const schema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    publishingYear: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Movie = model<IMovie>("Movie", schema);

export default Movie;
