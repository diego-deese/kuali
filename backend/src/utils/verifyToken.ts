import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.KEYPHRASE as string);
  } catch (error) {
    throw new Error('Token verification failed');
  }
};
