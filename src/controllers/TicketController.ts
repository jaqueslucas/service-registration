
import { Request, Response } from 'express';
import { UserDAOPG } from '../dao/UserDAOPG';
import { UserDAOMARIA } from '../dao/UserDAOMARIA';
import { UserDAOMongoDB } from '../dao/UserDAOMongoDB';

const userDAOPG = new UserDAOPG();
const userDAOMARIA = new UserDAOMARIA();
const userDAOMongoDB = new UserDAOMongoDB();

export const createTicket = async (req: Request, res: Response) => {
    const { natureza, descricao, provedor } = req.body;
    try {
        if (provedor === 'A') {
            await userDAOPG.insert_ticket(natureza, descricao, provedor);
        } else if (provedor === 'B') {
            await userDAOMongoDB.insert_ticket(natureza, descricao, provedor);
        } else if (provedor === 'C') {
            await userDAOMARIA.insert_ticket(natureza, descricao, provedor);
        }
        res.status(201).send('Ticket created successfully');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};

export const listTickets = async (req: Request, res: Response) => {
    try {
        const pgTickets = await userDAOPG.list_tickets();
        const mariaTickets = await userDAOMARIA.list_tickets();
        const mongoTickets = await userDAOMongoDB.list_tickets();

        const tickets = [...pgTickets, ...mariaTickets, ...mongoTickets];
        res.json(tickets);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
