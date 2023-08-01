import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Ticket } from "../models/ticket";
import { requireAuth } from "../middlewares/requireAuth";
import { validateRequest } from "../middlewares/validateRequest";
import { NotFoundError } from "../errors/notFoundError";
import { NotAuthorizedError } from "../errors/notAuthError";
import { TicketCreatedUpdater } from "../events/publishers/ticketCreateUpdater";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put(
  "/api/tickets/:id",
  // requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: any, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.body!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    await new TicketCreatedUpdater(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
