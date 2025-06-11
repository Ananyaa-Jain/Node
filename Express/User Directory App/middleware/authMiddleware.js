import dotenv from 'dotenv';
import { verify } from '../utils/jwtUtilities.js';

dotenv.config();

export function authenticateToken(req, res, next) {
  //if sending token as res.json
  // const authHeader = req.headers["authorization"];
  // const token = authHeader ? authHeader.split(" ")[1] : undefined;

  // if sending token as: res.cookie("token", token)
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('No Token.');
  }

  // if blacklist, check it
  // if(blacklist.has(token)){
  //     resturn res.status(403).json({message: "Token is blacklisted"})
  // }

  //verify token
  const user = verify(token);

  if (!user) {
    return res.status(403).send('Forbidden Access.');
  }
  req.user = user;
  next();
}
