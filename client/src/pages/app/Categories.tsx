/* eslint-disable @typescript-eslint/no-explicit-any */
// Categories.tsx
import React, { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import Button from "../../components/core/button";
import Table from "../../components/core/table";
import { useModal } from "../../hooks/useModal";
import { DeleteIcon, EditIcon } from "../../components/core/icons";
import { AiOutlineSearch } from "react-icons/ai";
import DeleteCategory from "../../components/categories/DeleteCategory";
import CreateUpdateCategory from "../../components/categories/CreateUpdateCategory";
import { Category } from "../../utils/types/category";

const Categories: React.FC = () => {
  const { data, loading, error, refetch } = useGet<Category[]>("/categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Category[]>(data || []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (data) {
      setFilteredData(
        data.filter((category) =>
          [category.name].some((field) =>
            field.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((category) =>
          [category.name].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [data, searchQuery]);

  const columns = [
    { header: "ID", accessor: (category: Category) => category.id },
    {
      header: "White Icon",
      accessor: (category: Category) => (
        <img
          src={category.iconWhite as any}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      header: "Dark Icon",
      accessor: (category: Category) => (
        <img
          src={category.iconBlack as any}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    { header: "Name", accessor: (category: Category) => category.name },
    {
      header: "Actions",
      accessor: (category: Category) => (
        <div className="flex items-center gap-2">
          <Button
            variant="blue"
            onClick={() =>
              openModal(
                <CreateUpdateCategory
                  defaultData={category}
                  onClose={() => {
                    closeModal();
                    refetch();
                  }}
                />
              )
            }
          >
            <EditIcon />
          </Button>
          <Button
            variant="red"
            onClick={() =>
              openModal(
                <DeleteCategory
                  category={category}
                  onClose={() => {
                    closeModal();
                    refetch();
                  }}
                />
              )
            }
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];
  const { openModal, closeModal } = useModal();

  return (
    <div className=" w-full">
      <div className="flex justify-end items-center mb-4 gap-4">
        {!error && !loading && (
          <div className="flex items-center gap-2  border-myBlue border  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2 px-4">
            <input
              type="text"
              className=" py-2 bg-inherit w-full  outline-none text-sm "
              placeholder="Search category by name"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <AiOutlineSearch className=" text-gray-500 w-5 h-5" />
          </div>
        )}
        <Button
          variant="primary"
          onClick={() =>
            openModal(
              <CreateUpdateCategory
                onClose={() => {
                  closeModal();
                  refetch();
                }}
              />
            )
          }
        >
          <p className="text-sm text-gray-200">Add Category</p>
        </Button>
      </div>
      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <div className="bg-white rounded-2xl m-3">
          <p className="text-primary  px-4  text-2xl  font-medium pb-2 pt-4">
            Categories
          </p>
          <Table
            data={filteredData}
            columns={columns}
            loading={loading}
            noDataComponent={
              <div className="flex items-center h-[300px] justify-center flex-col">
                <p className="text-gray-500 font-normal text-sm">
                  No Categories So Far
                </p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
