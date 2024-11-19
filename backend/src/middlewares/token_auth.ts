import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const config = process.env;

interface CustomRequest extends Request {
  user?: string | JwtPayload; 
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Retrieve the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    // Verify the token and assign the decoded data to req.user
    const decoded = jwt.verify(token, config.TOKEN_KEY as string);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  // Proceed to the next middleware or route handler
  return next();
};

export default verifyToken;
