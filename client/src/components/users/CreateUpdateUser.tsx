/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AvatarInput from "../core/avatar-input";
import Button from "../core/button";
import { User } from "../../utils/types/user";
import { toast } from "react-toastify";
import { createUser, updateUser } from "../../utils/funcs/user";
import { AvatarIcon } from "../core/icons";

interface CreateUpdateUserProps {
  defaultData?: User | null;
  onClose: () => void;
}

const CreateUpdateUser: React.FC<CreateUpdateUserProps> = ({
  defaultData,
  onClose,
}) => {
  const [name, setName] = useState(defaultData?.name || "");
  const [surname, setSurname] = useState(defaultData?.surname || "");
  const [email, setEmail] = useState(defaultData?.email || "");
  const [photo, setPhoto] = useState<string | null>(defaultData?.photo || null);
  const [birthdate, setBirthdate] = useState(
    new Date(defaultData?.birthdate as any).toLocaleDateString("en-CA") || ""
  );
  const [sex, setSex] = useState(defaultData?.sex || "");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name: string | null;
    surname: string | null;
    email: string | null;
    photo: string | null;
    birthdate: string | null;
    sex: string | null;
  }>({
    name: null,
    surname: null,
    email: null,
    photo: null,
    birthdate: null,
    sex: null,
  });

  const validateInputs = () => {
    const newErrors = {
      name: !name ? "Name is required." : "",
      surname: !surname ? "Surname is required." : "",
      email: !email ? "Email is required." : "",
      photo: !photo ? "Photo is required." : "",
      birthdate: !birthdate ? "Birthdate is required." : "",
      sex: !sex ? "Sex is required." : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const updatedUserData: Partial<User> = {};
    if (name !== defaultData?.name) updatedUserData.name = name;
    if (surname !== defaultData?.surname) updatedUserData.surname = surname;
    if (email !== defaultData?.email) updatedUserData.email = email;
    if (photo !== defaultData?.photo) updatedUserData.photo = photo as any;
    if (
      birthdate !==
      new Date(defaultData?.birthdate as any).toLocaleDateString("en-CA")
    )
      updatedUserData.birthdate = new Date(birthdate);
    if (sex !== defaultData?.sex) updatedUserData.sex = sex;

    try {
      if (defaultData) {
        await updateUser(updatedUserData, defaultData.id as any, onClose);
      } else {
        await createUser(
          {
            name,
            surname,
            email,
            photo,
            birthdate: new Date(birthdate),
            sex,
          } as any,
          onClose
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while saving the user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        {defaultData ? "Update User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <AvatarInput
            noDataChild={<AvatarIcon className="w-20 h-20" />}
            value={photo}
            onChange={(value) => {
              errors.photo && setErrors((prev) => ({ ...prev, photo: null }));
              setPhoto(value as any);
            }}
          />
          {errors.photo && (
            <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="w-full  text-sm text-gray-600 ">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              errors.name && setErrors((prev) => ({ ...prev, name: null }));
              setName(e.target.value);
            }}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="surname" className="w-full  text-sm text-gray-600 ">
            Surname
          </label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => {
              errors.surname &&
                setErrors((prev) => ({ ...prev, surname: null }));
              setSurname(e.target.value);
            }}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
            placeholder="Enter surname"
          />
          {errors.surname && (
            <p className="text-red-500 text-xs">{errors.surname}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="w-full  text-sm text-gray-600 ">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              errors.email && setErrors((prev) => ({ ...prev, email: null }));
              setEmail(e.target.value);
            }}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthdate" className="w-full  text-sm text-gray-600 ">
            Birthdate
          </label>
          <input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => {
              errors.birthdate &&
                setErrors((prev) => ({ ...prev, birthdate: null }));
              setBirthdate(e.target.value);
            }}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-xs">{errors.birthdate}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="sex" className="w-full  text-sm text-gray-600 ">
            Sex
          </label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => {
              errors.sex && setErrors((prev) => ({ ...prev, sex: null }));
              setSex(e.target.value);
            }}
            className="px-4 py-2 bg-inherit  w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
          >
            <option value="" disabled>
              Select sex
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.sex && <p className="text-red-500 text-xs">{errors.sex}</p>}
        </div>
        <div className="flex justify-between space-x-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className=" text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className=" text-sm"
            loading={loading}
            disabled={loading}
          >
            {defaultData ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateUser;
