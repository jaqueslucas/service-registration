// server/src/routes/TicketRoutes.ts
import { Router } from 'express';
import { createTicket, listTickets } from '../controllers/TicketController';

const router = Router();

router.post('/tickets', createTicket);
router.get('/tickets', listTickets);

export default router;
