import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import mongoose from "mongoose";

// import routers

// middleware
import { NotFoundError } from "./errors/notFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { currentUserRouter } from "./routes/currentUser";
import { signoutRouter } from "./routes/signout";

// configuration
const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// routers users routes
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

// error handler
app.use(errorHandler);
app.all("*", async (req, res) => {
  return res.send({
    status: 404,
    error: "Not Found",
  });
});
//connect to database
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not set");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Mongoose connection successful");
  } catch (error) {
    console.log(error);
  }
};

// starst the server
app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!!!!!!!");
});

start();
