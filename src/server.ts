
import express from 'express';
import cors from 'cors';
import path from 'path';
import ticketRoutes from './routes/TicketRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', ticketRoutes);


app.use(express.static(path.join(__dirname, '../../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
