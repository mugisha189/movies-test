import React from "react";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import useGet from "../../hooks/useGet";

const Dashboard: React.FC = () => {
  const {
    data: dashStats,
    loading,
    error,
  } = useGet<
    {
      name: string;
      count: number;
    }[]
  >("/dashboard/stats");

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "users":
        return <LuUsers2 className="w-8 h-8 " />;
      case "categories":
        return <MdOutlineCategory className="w-8 h-8" />;
      default:
        return <IoStatsChart className="w-8 h-8 " />;
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-20">{error.message}</div>
    );

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {dashStats?.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-3xl shadow-xl flex justify-between  items-center space-x-4 text-gray-500"
          >
            <div>
              <p className="text-sm font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-600">{stat.count}</p>
            </div>
            <div className="bg-primary p-3 rounded-2xl text-white">
              {getIcon(stat.name)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
