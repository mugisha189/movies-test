/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Category } from "../../utils/types/category";
import { DeleteIcon } from "../core/icons";
import Button from "../core/button";
import { deleteCategory } from "../../utils/funcs/category";
import { useModal } from "../../hooks/useModal";

const DeleteCategory: React.FC<{ category: Category; onClose: () => void }> = ({
  category,
  onClose,
}) => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  // Function to handle deletion of the category
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCategory(category.id as any, onClose);
    } catch (error) {
      console.error("Error deleting category:", error);
      // Handle error if necessary
    }
    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <div className="text-red-700">
        <DeleteIcon height="h-16" width="w-16" />
      </div>
      <p className="text-xl text-center text-gray-600">
        Are you sure ?
      </p>
      <p className="text-sm text-center text-gray-500 mt-2">
        Deleting this category will remove it permanently from the system. All
        associated data and references to this category will also be deleted.
        Please ensure that you want to proceed with this action.
      </p>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="secondary" className="text-sm" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="text-sm"
          loading={loading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteCategory;
