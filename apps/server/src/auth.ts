import jwt from 'jsonwebtoken';

// import { User } from './model';
import { config } from './config';
import User, { type IUser } from './modules/user/UserModel';

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), config.JWT_SECRET);

    const user = await User.findOne({ _id: (decodedToken as { id: string }).id });

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
};

export const generateToken = (user: IUser) => {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
};
