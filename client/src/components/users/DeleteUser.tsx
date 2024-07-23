/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DeleteIcon } from "../core/icons";
import Button from "../core/button";
import { useModal } from "../../hooks/useModal";
import { User } from "../../utils/types/user";
import { deleteUser } from "../../utils/funcs/user";

const DeleteUser: React.FC<{ user: User; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="text-red-700">
        <DeleteIcon height="h-16" width="w-16" />
      </div>
      <p className="text-xl text-center text-gray-600">
        Are you sure ?
      </p>
      <p className="text-sm text-center text-gray-500 mt-2">
        Deleting <span className="text-primary">{user.name}</span> will remove all associated data and actions. This
        action cannot be undone. Please ensure you want to proceed.
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
            await deleteUser(user.id as any, onClose);
            setLoading(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteUser;
