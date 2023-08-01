import { Subjects } from "../../nats/subjects";
import { Publisher } from "../../nats/basePıblisher";
import { TicketUpdatedEvent } from "../../nats/ticketUpdatedEvent";

export class TicketCreatedUpdater extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
