import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateUpdateMovie from "../../components/movies/CreateUpdateMovie";
import useGet from "../../hooks/useGet"; // Import your custom hook
import { Movie } from "../../utils/types/movie";

const EditMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  // Fetch movie details based on the ID from URL
  const { data, loading, error } = useGet<Movie>(`/movie/${id}`);

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);

  return (
    <div className="flex h-screen w-screen overflow-hidden items-center justify-center">
      <div className="w-full px-[5vw] md:px-[7vw] lg:px-[10vw]">
        {loading ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <p className="text-xl">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <p className="text-xl text-red-500">Error: {error.message}</p>
          </div>
        ) : movie ? (
          <>
            <div className="flex items-center gap-2 mb-10">
              <p className="text-3xl font-bold">Edit Movie</p>
            </div>
            <CreateUpdateMovie defaultData={movie} />
          </>
        ) : (
          <div className="flex h-screen w-screen items-center justify-center">
            <p className="text-xl">Movie not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMovie;
