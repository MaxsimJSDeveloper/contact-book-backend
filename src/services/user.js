import { UsersCollection } from '../db/models/user.js';

export const getCurrentUser = async (id) => {
  const user = await UsersCollection.findOne({ _id: id });
  console.log(id);
  console.log(`${user}`);
  return user;
};
