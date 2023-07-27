import express from "express";
import "express-async-errors"; 
import { json } from "body-parser";

// import routers

// middleware
import { NotFoundError } from "./errors/notFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { signupRouter } from "./routes/signup";

// configuration
const app = express();
app.use(json());

//connect to database

// routers users routes
app.use(signupRouter);

app.use(errorHandler);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// starst the server

app.listen(3000, () => {
  console.log("Server is running on port 3000 !!!!!!!!!");
});
