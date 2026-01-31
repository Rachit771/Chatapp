export const getSender = (loggedUser, users) => {
  console.log(loggedUser._id)
  console.log(users[0]._id,
users[1]._id
)
  return users[1]?._id === loggedUser?._id ? users[0].name : users[1].name; //This for deciding which ChatName to display
};