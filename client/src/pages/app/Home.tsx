import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoExitOutline,
} from "react-icons/io5";
import useGet from "../../hooks/useGet";
import { Movie } from "../../utils/types/movie";
import Button from "../../components/core/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const Home: React.FC = () => {
  const { data: movies, loading, error, refetch } = useGet<Movie[]>("/movie");
  const navigate = useNavigate();
  const { logout } = useUser();

  return (
    <div className="p-10 text-white h-screen w-screen overflow-hidden overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-bold">My Movies</p>
          <IoAddCircleOutline onClick={() => navigate("/add")} className="w-7 h-7" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">Logout</p>
          <IoExitOutline onClick={logout}  className="w-8 h-8"/>
        </div>
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-cardColor  p-2 rounded-2xl shadow animate-pulse"
              >
                <div className="bg-gray-300 h-40 rounded-md"></div>
                <div className="mt-4">
                  <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-4 w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error.message}</p>
          <Button
            variant="primary"
            onClick={refetch}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </Button>
        </div>
      )}

      {!loading && !error && movies?.length === 0 && (
        <div className="flex items-center justify-center flex-col h-full ">
          <p className="text-3xl  mb-4 font-bold">
            You have no movies on your list
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/add")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            <IoAddCircle className="inline mr-2" /> Add Movie
          </Button>
        </div>
      )}

      {!loading && !error && movies?.length && movies?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-cardColor  p-2 rounded-2xl shadow flex flex-col items-center"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="mt-2 w-full">
                <p className="text-lg font-semibold">{movie.title}</p>
                <p className="text-sm ">{movie.publishingYear}</p>
              </div>
              <div className="mt-2 flex gap-2 justify-end w-full">
                <button
                  onClick={() => {
                    navigate(`/edit/${movie.id}`);
                  }}
                  className="text-blue-500  p-2  border border-blue-500 rounded-full"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    /* Logic to delete movie */
                  }}
                  className="text-red-500  p-2  border border-red-500 rounded-full"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
