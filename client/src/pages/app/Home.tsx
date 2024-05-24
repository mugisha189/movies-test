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
import { useModal } from "../../hooks/useModal";
import DeleteMovie from "../../components/movies/DeleteMovie";
const Home: React.FC = () => {
  const { data: movies, loading, error, refetch } = useGet<Movie[]>("/movie");
  const navigate = useNavigate();
  const { logout } = useUser();
  const { openModal } = useModal();

  return (
    <div className="p-10 text-white h-screen w-screen overflow-hidden overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-bold">My Movies</p>
          <IoAddCircleOutline
            onClick={() => navigate("/add")}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={logout}
        >
          <p className="text-lg font-semibold">Logout</p>
          <IoExitOutline className="w-8 h-8" />
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
                <div className="bg-inputColor h-72 rounded-2xl"></div>
                <div className="mt-4">
                  <div className="bg-inputColor h-4 w-3/4 mb-2 rounded"></div>
                  <div className="bg-inputColor h-4 w-1/2 rounded"></div>
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
                className="w-full h-72 object-cover rounded-md"
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
                  className="text-blue-500  p-2  border border-blue-500 rounded-full cursor-pointer"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    openModal(<DeleteMovie movie={movie} onClose={refetch} />);
                  }}
                  className="text-red-500  p-2  border border-red-500 rounded-full cursor-pointer"
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
