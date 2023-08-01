import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

// import routers
import { testRouter } from "./routes/test";
import { createTicketRouter } from "./routes/newa";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

// middleware
import { errorHandler } from "./middlewares/errorHandler";

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
app.use(testRouter);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
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

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS Cliend ID yok");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS URL yok");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS NATS_CLUSTER_ID yok");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect("mongodb://ticket-mongo-srv:27017/ticket");
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
