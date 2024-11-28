let jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

exports.authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  try {
    let decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};