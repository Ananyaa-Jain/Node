import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const expiration_time = process.env.EXPIRES_IN;

export function verify(token) {
  try {
    return jwt.verify(token, secret_key);
  } catch (err) {
    return null; //if verification fails
  }
}

export function signToken(username) {
  const token = jwt.sign({ username }, secret_key, {
    expiresIn: expiration_time,
  });
  console.log(token);
  return token;
}
