import User from '../src/modules/user/UserModel';

export const getOrCreateRelayUser = async () => {
  const name = 'Relay Workhop';
  const email = 'relay@example.com';
  const password = 'relay';

  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }

  return await new User({
    name,
    email,
    password,
  }).save();
};
