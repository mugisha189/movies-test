/* eslint-disable @typescript-eslint/no-explicit-any */
// Users.tsx
import React, { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import Button from "../../components/core/button";
import Table from "../../components/core/table";
import { User } from "../../utils/types/user";
import { useModal } from "../../hooks/useModal";
import CreateUpdateUser from "../../components/users/CreateUpdateUser";
import { DeleteIcon, EditIcon } from "../../components/core/icons";
import DeleteUser from "../../components/users/DeleteUser";
import { AiOutlineSearch } from "react-icons/ai";

const Users: React.FC = () => {
  const { data, loading, error, refetch } = useGet<User[]>("/users");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>(data || []);

  

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (data) {
      setFilteredData(
        data.filter((user) =>
          [user.name, user.surname, user.email].some((field) =>
            field.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((user) =>
          [user.name, user.surname, user.email].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [data, searchQuery]);

  const columns = [
    { header: "ID", accessor: (user: User) => user.id },
    {
      header: "Icon",
      accessor: (user: User) => (
        <img
          src={user.photo as any}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    { header: "Name", accessor: (user: User) => user.name },
    { header: "Surname", accessor: (user: User) => user.surname },
    { header: "Email", accessor: (user: User) => user.email },
    {
      header: "Actions",
      accessor: (user: User) => (
        <div className="flex items-center gap-2">
          <Button
            variant="blue"
            onClick={() =>
              openModal(
                <CreateUpdateUser
                  defaultData={user}
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
                <DeleteUser
                  user={user}
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
              placeholder="Search users by name, surname or email..."
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
              <CreateUpdateUser
                onClose={() => {
                  closeModal();
                  refetch();
                }}
              />
            )
          }
        >
          <p className="text-sm text-gray-200">Add User</p>
        </Button>
      </div>
      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <div className="bg-white rounded-2xl m-3">
          <p className="text-primary  px-4  text-2xl  font-medium pb-2 pt-4">
            Users
          </p>
          <Table
            data={filteredData}
            columns={columns}
            loading={loading}
            noDataComponent={
              <div className="flex items-center h-[300px] justify-center flex-col">
                <p className="text-gray-500 font-normal text-sm">
                  No Users So Far
                </p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Users;
