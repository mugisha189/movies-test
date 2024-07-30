import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircleOutline, IoExitOutline } from "react-icons/io5";
import useGet from "../../hooks/useGet";
import { Movie } from "../../utils/types/movie";
import Button from "../../components/core/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useModal } from "../../hooks/useModal";
import DeleteMovie from "../../components/movies/DeleteMovie";
import { useTranslation } from "react-i18next";

const PAGE_LIMIT = 10; // Number of items per page

const Home: React.FC = () => {
  const { t } = useTranslation(); // Use the t function for localization
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, refetch } = useGet<{
    numberOfTotalItems: number;
    items: Movie[];
  }>(`/movie?page=${currentPage}&limit=${PAGE_LIMIT}`);
  const navigate = useNavigate();
  const { logout } = useUser();
  const { openModal, closeModal } = useModal();
  const numberOfTotalItems = data?.numberOfTotalItems || 0;
  const movies = data?.items || [];
  const totalPages = Math.ceil(numberOfTotalItems / PAGE_LIMIT);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      refetch();
    }
  };

  // Function to determine which page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1]; // Only one page to display

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="p-10 text-white h-screen w-screen overflow-hidden overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-bold">{t("myMovies")}</p>
          <IoAddCircleOutline
            onClick={() => navigate("/add")}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={logout}
        >
          <p className="text-lg font-semibold">{t("logout")}</p>
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
                className="bg-cardColor p-2 rounded-2xl shadow animate-pulse"
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
          <p className="text-red-500 mb-4 text-xl font-semibold">
            {t("fetchErrorTitle")}
          </p>
          <p className="text-gray-300 mb-6 text-center w-full md:w-[70%] lg:w-[50%] text-sm">
            {t("fetchErrorDescription")}
          </p>
          <Button
            variant="primary"
            onClick={refetch}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            {t("refreshButton")}
          </Button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="flex items-center justify-center flex-col h-full">
          <p className="text-3xl mb-4 font-bold">{t("emptyMoviesTitle")}</p>
          <p className="text-gray-300 mb-6 text-center w-full md:w-[70%] lg:w-[50%] text-sm">
            {t("emptyMoviesDescription")}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate("/add")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            <IoAddCircleOutline className="inline mr-2" /> {t("addMovieButton")}
          </Button>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-cardColor p-2 rounded-2xl shadow flex flex-col items-center z-20"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-md"
                />
                <div className="mt-2 w-full">
                  <p className="text-lg font-semibold">{movie.title}</p>
                  <p className="text-sm">{movie.publishingYear}</p>
                </div>
                <div className="mt-2 flex gap-2 justify-end w-full">
                  <button
                    onClick={() => navigate(`/edit/${movie.id}`)}
                    className="text-blue-500 p-2 border border-blue-500 rounded-full cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      openModal(
                        <DeleteMovie
                          movie={movie}
                          onClose={() => {
                            closeModal();
                            refetch();
                          }}
                        />
                      );
                    }}
                    className="text-red-500 p-2 border border-red-500 rounded-full cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2  text-white rounded-l"
            >
              {t("prev")}
            </button>
            {
              getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 text-white font-semibold ${
                    pageNumber === currentPage ? "bg-primary" : "bg-background"
                  } rounded`}
                >
                  {pageNumber}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2  text-white "
            >
              {t("next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
