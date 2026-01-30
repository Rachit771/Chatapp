export const getSender = (loggedUser, users) => {
  console.log("loggedUser:", loggedUser);
  console.log("users:", users);

  return users.find((u) => u._id !== loggedUser?._id)?.name;
};