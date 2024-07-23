/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AvatarInput from "../core/avatar-input";
import Button from "../core/button";
import { ImageFileIcon } from "../core/icons";
import { Category } from "../../utils/types/category";
import { createCategory, updateCategory } from "../../utils/funcs/category";
import { useModal } from "../../hooks/useModal";

interface CreateUpdateCategoryProps {
  defaultData?: Category | null;
  onClose: () => void;
}

const CreateUpdateCategory: React.FC<CreateUpdateCategoryProps> = ({
  defaultData,
  onClose,
}) => {
  const [name, setName] = useState(defaultData?.name || "");
  const [iconWhite, setIconWhite] = useState<string | null>(
    defaultData?.iconWhite || null
  );
  const [iconBlack, setIconBlack] = useState<string | null>(
    defaultData?.iconBlack || null
  );
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string>(""); // State for name validation error
  const { closeModal } = useModal();

  const validateForm = () => {
    let valid = true;
    if (!name) {
      setNameError("Category name is required");
      valid = false;
    } else {
      setNameError("");
    }
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const categoryData = { name, iconWhite, iconBlack };
    if (defaultData) {
      await updateCategory(categoryData, defaultData.id as any, onClose);
    } else {
      await createCategory(categoryData, onClose);
    }
    setLoading(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) {
      setNameError(""); // Clear name error on change
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        {defaultData ? "Update Category" : "Create Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <p className="text-left">White Icon</p>
          <AvatarInput
            noDataChild={<ImageFileIcon className="w-32 h-32" />}
            value={iconWhite}
            onChange={(value) => setIconWhite(value as any)}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-left">Black Icon</p>
          <AvatarInput
            noDataChild={<ImageFileIcon className="w-32 h-32" />}
            value={iconBlack}
            onChange={(value) => setIconBlack(value as any)}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category-name"
            className="w-full  text-sm text-gray-600"
          >
            Category Name
          </label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
            placeholder="Enter category name"
            required
          />
          {nameError && (
            <p className="text-red-500 text-xs mt-1">{nameError}</p>
          )}
        </div>
        <div className="flex justify-between space-x-4">
          <Button variant="secondary" onClick={closeModal} className="text-sm">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="text-sm"
            loading={loading}
          >
            {defaultData ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateCategory;
