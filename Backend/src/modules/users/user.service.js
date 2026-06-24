const User = require("./user.model");

const searchUsers = async (currentUserId, search) => {
  const keyword = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  return User.find(keyword)
    .find({ _id: { $ne: currentUserId } })
    .select("-password");
};

module.exports = { searchUsers };
