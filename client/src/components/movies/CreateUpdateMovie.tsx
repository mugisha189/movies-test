import React, { useState } from "react";
import FileInput from "../core/file-input";
import Button from "../core/button";
import { toast } from "react-toastify";
import { Movie } from "../../utils/types/movie";
import { createMovie, updateMovie } from "../../utils/funcs/movie";
import InputField from "../core/input";
import { useNavigate } from "react-router-dom";

interface CreateUpdateMovieProps {
  defaultData?: Movie | null;
}

const CreateUpdateMovie: React.FC<CreateUpdateMovieProps> = ({
  defaultData,
}) => {
  const [title, setTitle] = useState(defaultData?.title || "");
  const [publishingYear, setPublishingYear] = useState(
    defaultData?.publishingYear || ""
  );
  const [image, setImage] = useState<string | undefined>(defaultData?.image);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    title: string | undefined;
    publishingYear: string | undefined;
    image: string | undefined;
  }>({
    title: undefined,
    publishingYear: undefined,
    image: undefined,
  });

  const validateInputs = () => {
    const newErrors = {
      title: !title ? "Title is required." : "",
      publishingYear: !publishingYear ? "Publishing Year is required." : "",
      image: !image ? "Image is required." : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    const updatedMovieData: Partial<Movie> = {};
    if (title !== defaultData?.title) updatedMovieData.title = title;
    if (publishingYear !== defaultData?.publishingYear)
      updatedMovieData.publishingYear = publishingYear;
    if (image !== defaultData?.image) updatedMovieData.image = image;

    try {
      if (defaultData) {
        await updateMovie(updatedMovieData, defaultData.id);
      } else {
        await createMovie({
          title,
          publishingYear,
          image,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(
        "An error occurred while saving the movie. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  justify-between flex-col md:flex-row w-full gap-10"
    >
      <div className="flex flex-col w-full  md:w-1/2">
        <FileInput
          onFileSelect={(file) => {
            setErrors((prev) => ({ ...prev, image: undefined }));
            setImage(file.result as string);
          }}
          initialFileUrl={image || undefined}
          label="Select Movie Image"
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>

      <div className="w-full  md:w-1/2 space-y-4">
        <InputField
          type="text"
          value={title}
          onChange={(e) => {
            errors.title &&
              setErrors((prev) => ({ ...prev, title: undefined }));
            setTitle(e.target.value);
          }}
          placeholder="Enter movie title"
          label="Title"
          error={errors.title}
        />

        <InputField
          type="text"
          value={publishingYear}
          onChange={(e) => {
            errors.publishingYear &&
              setErrors((prev) => ({ ...prev, publishingYear: undefined }));
            setPublishingYear(e.target.value);
          }}
          placeholder="Enter publishing year"
          label="Publishing Year"
          error={errors.publishingYear}
        />

        <div className="flex  space-x-4">
          <Button variant="secondary" disabled={loading} className="text-sm">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="text-sm"
            loading={loading}
            disabled={loading}
          >
            {defaultData ? "Update Movie" : "Create Movie"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateUpdateMovie;
