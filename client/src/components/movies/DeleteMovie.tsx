/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../core/button";
import { useModal } from "../../hooks/useModal";
import { Movie } from "../../utils/types/movie";
import { deleteMovie } from "../../utils/funcs/movie";
import { useTranslation } from "react-i18next";

const DeleteMovie: React.FC<{ movie: Movie; onClose: () => void }> = ({
  movie,
  onClose,
}) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="text-red-700">
        <MdDeleteOutline className="h-16 w-16" />
      </div>
      <p className="text-xl text-center">{t("deleteConfirmation")}</p>
      <p className="text-sm text-center text-gray-100 mt-2">
        {t("deleteMessage", { movieTitle: movie.title })}
      </p>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="secondary" onClick={closeModal} className="text-sm">
          {t("cancel")}
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
          {t("delete")}
        </Button>
      </div>
    </div>
  );
};

export default DeleteMovie;
