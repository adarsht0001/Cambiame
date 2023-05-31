import { NextFunction, Request, Response } from "express";
import AppError from "../../../utils/appErrors";
import { HttpStatus } from "../../../types/httpStatus";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  let token: string | null = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
  }
  if (token == null) return res.status(401).json({ msg: "Invalid Token" });
  jwt.verify(token, process.env.ACESS_TOKEN_SCERET, (error: any, user: any) => {
    if (error) return res.status(401).json({ msg: "Invalid Token" });
    next();
  });
};

export default authenticateToken;
