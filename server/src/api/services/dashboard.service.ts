import { Category, User } from "../models";

const getStats = async () => {
  const users = await User.count({
    where: {
      role: "User",
    },
  });
  const categories = await Category.count({});

  return [
    { name: "Users", count: users },
    { name: "Categories", count: categories },
  ];
};

export default {
  getStats,
};
