const Bcrypt = require('bcrypt');
const User = require('./User');

const saltRounds = (process.env.NODE_ENV === 'production') ? 12 : 10;

const persistUser = async function (username, password) {
  const user = await new User({
    username,
    password,
  });

  user.save();
  return { message: `User ${username} created successfully` };
};

const createUser = async function (req, h) {
  const { username } = req.payload;
  const { password } = req.payload;

  return new Promise(((resolve, reject) => {
    Bcrypt.hash(password, saltRounds).then((hash) => {
      resolve(persistUser(username, hash));
    });
  }));
};

const validate = async (request, username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, username: user.username };

  return { isValid, credentials };
};

module.exports = {
  createUser,
  validate,
};
