import { sign } from "jsonwebtoken";

export const MAX_AGE = 60 * 60 * 24 * 30;
const jwtSecretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

export const generateToken = (payload) => {
  return sign(payload, jwtSecretKey, {
    expiresIn: MAX_AGE,
  });
} 