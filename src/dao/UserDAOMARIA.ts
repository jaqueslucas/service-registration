// src/dao/UserDAOMARIA.ts
import mysql, { RowDataPacket } from 'mysql2/promise';
import { UserDAO } from './UserDAO';
import { SingletonLogger } from '../utils/Logger';

const logger = SingletonLogger.getInstance();

export class UserDAOMARIA implements UserDAO {
    private dbConfig = {
        user: 'root',
        host: '127.0.0.1',
        database: 'servicedesk',
        password: '123',
        port: 3306,
    };

    async insert_ticket(natureza: string, descricao: string, provedor: string): Promise<void> {
        const connection = await mysql.createConnection(this.dbConfig);
        let data = { natureza, descricao, provedor };
        console.log(data); // debug

        try {
            console.log('Successfully connected to the database');
            logger.info('Successfully connected to the MariaDB database');
            
            const insertQuery = 'INSERT INTO ticket(natureza, descricao, provedor) VALUES (?, ?, ?)';
            await connection.execute(insertQuery, [natureza, descricao, provedor]);
            console.log('Data successfully inserted');
            logger.info(`Data successfully inserted: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error executing the query', error);
            logger.error(`Error executing the query: ${error}`);
        } finally {
            await connection.end();
            console.log("Database connection closed");
            logger.info('MariaDB database connection closed');
        }
    }

    async list_tickets(): Promise<RowDataPacket[]> {
        const connection = await mysql.createConnection(this.dbConfig);
        try {
            const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM ticket');
            return rows;
        } finally {
            await connection.end();
        }
    }
}
