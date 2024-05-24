/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../core/button";
import { useModal } from "../../hooks/useModal";
import { Movie } from "../../utils/types/movie";
import { deleteMovie } from "../../utils/funcs/movie";

const DeleteMovie: React.FC<{ movie: Movie; onClose: () => void }> = ({
  movie,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="text-red-700">
        <MdDeleteOutline className="h-16 w-16" />
      </div>
      <p className="text-xl text-center">Are you sure ?</p>
      <p className="text-sm text-center text-gray-100 mt-2">
        Deleting <span className="text-primary">{movie.title}</span> will remove
        all associated data and actions. This action cannot be undone. Please
        ensure you want to proceed.
      </p>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="secondary" onClick={closeModal} className="text-sm">
          Cancel
        </Button>
        <Button
          variant="primary"
          loading={loading}
          className="text-sm"
          onClick={async () => {
            setLoading(true);
            await deleteMovie(movie.id as any, onClose);
            setLoading(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteMovie;
