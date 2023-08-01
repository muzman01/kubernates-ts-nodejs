import express, { Request, Response } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validateRequest";

import { BadRequestError } from "../errors/badRequestError";

const router = express.Router();

router.get("/api/tickets/test", async (req: Request, res: Response) => {
  res.send("Hello World");
});

export { router as testRouter };
