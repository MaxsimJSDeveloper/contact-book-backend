import { getCurrentUser } from '../services/user.js';

export const getCurrentUserController = async (req, res) => {
  const user = await getCurrentUser(req.user._id);

  res.status(200).json({
    message: `Success!`,
    data: user,
  });
};
