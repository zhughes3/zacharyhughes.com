const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
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

const validate = async (decoded, request) => {
// const validate = async (request, username, password) => {
  const username = decoded.username;
  const user = await User.findOne({ username });
  if (!user) {
    return { credentials: null, isValid: false };
  }

  //const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, username: user.username };

  return { isValid: true, credentials };
};

const login = async function(request, h)  {
  const { username } = request.payload;
      const { password } = request.payload;

      const user = await User.findOne({ username });
      if (!user) {
        return { credentials: null, isValid: false };
      }

      const isValid = await Bcrypt.compare(password, user.password);

      if (isValid) {
        let token = jwt.sign({username}, config.app.secret,{ expiresIn: '24h' });
        return h.response({
          success: true,
          message: 'Authentication successful.',
          token
        }).header("Authorization", token);
      } else {
        return h.response({
          success: false,
          message: 'Authentication unsuccessful'
        }).code(401);
      }
};

module.exports = {
  createUser,
  validate,
  login
};
