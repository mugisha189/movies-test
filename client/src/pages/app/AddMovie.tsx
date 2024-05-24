import React from "react";
import CreateUpdateMovie from "../../components/movies/CreateUpdateMovie";

const AddMovie: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden items-center justify-center ">
      <div className="w-full px-[5vw] md:px-[7vw] lg:px-[10vw]">
        <div className="flex items-center gap-2 mb-10">
          <p className="text-3xl font-bold">Create a new Movie</p>
        </div>
        <CreateUpdateMovie />
      </div>
    </div>
  );
};

export default AddMovie;
