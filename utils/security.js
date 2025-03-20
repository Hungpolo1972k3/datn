const bcrypt = require('bcryptjs');
const { randomInt } = require('node:crypto');
const CONFIG_STATUS = require('../configs/status.json');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const SALT_ROUND = 10;
const generatePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

  return hashedPassword;
};

const generateToken = ({ phone, role, _id, status }) => {
  const token = jwt.sign({ phone, role, _id, status }, JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRE_USER),
  });
  return token;
};
const generateRefreshToken = ({ phone, role, status }) => {
  const token = jwt.sign({ phone, role, status }, JWT_SECRET_KEY);
  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);

  return result;
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    return {
      status: 200,
      data,
    };
  } catch (error) {
    return {
      status: CONFIG_STATUS.TOKEN_EXPIRED,
      message: `Token Expired AT ${error.expiredAt}`,
    };
  }
};

const generateTokenCustomer = ({ phone, customer_id, role, status }) => {
  const token = jwt.sign({ phone, customer_id, role, status }, JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRE_CUSTOMER),
  });
  return token;
};

const decodePassword = async (password) => {
  const decodePassword = await bcrypt.hash(password, -SALT_ROUND);
  return decodePassword;
};

const generateRegisterCode = () => {
  const buffer = randomInt(1000000);
  return buffer.toString().padStart(6, '0');
};
module.exports = {
  generatePassword,
  verifyPassword,
  decodePassword,
  generateToken,
  verifyToken,
  generateTokenCustomer,
  generateRefreshToken,
  generateRegisterCode,
};
