import { toast } from "react-toastify";
import { authorizedApi } from "../api";
import { Movie } from "../types/movie";

export const createMovie = async (
  movie: Partial<Movie>,
  callback?: () => void
): Promise<Movie | void> => {
  try {
    const response = await authorizedApi.post("/movie", movie);
    toast.success("Movie created successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while creating the movie. Please try again later."
    );
  }
};

export const updateMovie = async (
  movie: Partial<Movie>,
  id: string,
  callback?: () => void
): Promise<Movie | void> => {
  try {
    const response = await authorizedApi.put(`/movie/${id}`, movie);
    toast.success("Movie updated successfully");
    callback && callback();
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while updating the movie. Please try again later."
    );
  }
};

export const deleteMovie = async (
  id: string,
  callback?: () => void
): Promise<void> => {
  try {
    await authorizedApi.delete(`/movie/${id}`);
    toast.success("Movie deleted successfully");
    callback && callback();
  } catch (error) {
    console.error(error);
    toast.error(
      "An error occurred while deleting the movie. Please try again later."
    );
  }
};
