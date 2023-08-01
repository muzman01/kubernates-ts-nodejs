import { Subjects } from "../../nats/subjects";
import { Publisher } from "../../nats/basePıblisher";
import { TicketCreatedEvent } from "../../nats/ticketCreatedEvents";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated; 
}
