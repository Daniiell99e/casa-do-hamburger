import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      users?: string | admin | jwt.JwtPayload;
    }
  }
}
