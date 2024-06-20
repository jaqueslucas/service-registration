// server/src/routes/TicketRoutes.ts
import { Router } from 'express';
import { createTicket, listTickets, listTicketsByProvider } from '../controllers/TicketController';

const router = Router();

router.post('/tickets', createTicket);
router.get('/tickets', listTickets);
router.get('/tickets/list', listTicketsByProvider);

export default router;
