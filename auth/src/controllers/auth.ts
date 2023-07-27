import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestError";
import { DatabaseConnectionError } from "../errors/databaseError";

export const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send({
    status: 200,
    message: "User signed in successfully",
  });
};

export const currentUser = async (req: Request, res: Response) => {
  res.send({
    message: "current user",
  });
};

export const signinOut = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send({
    message: "signout",
  });
};

export const signinUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  console.log("Creating a user...");
  throw new DatabaseConnectionError();

  res.send({});
};
