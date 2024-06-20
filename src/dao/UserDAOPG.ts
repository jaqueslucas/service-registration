
import { Client } from 'pg';
import { UserDAO } from './UserDAO';
import { SingletonLogger } from '../utils/Logger';

const logger = SingletonLogger.getInstance();

export class UserDAOPG implements UserDAO {
    private dbConfig = {
        user: 'postgres',
        host: 'localhost',
        database: 'servicos_ti',
        password: '4546',
        port: 5432,
    };

    async insert_ticket(natureza: string, descricao: string, provedor: string): Promise<void> {
        const client = new Client(this.dbConfig);
        let data = { natureza, descricao, provedor };
        console.log(data); // debug

        try {
            await client.connect();
            console.log('Successfully connected to the database');
            logger.info('Successfully connected to the PostgreSQL database');
            
            const insertQuery = 'INSERT INTO tb_ticket(natureza, descricao, provedor) VALUES ($1, $2, $3)';
            await client.query(insertQuery, [natureza, descricao, provedor]);
            console.log('Data successfully inserted');
            logger.info(`Data successfully inserted: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error executing the query', error);
            logger.error(`Error executing the query: ${error}`);
        } finally {
            await client.end();
            console.log('Database connection closed');
            logger.info('PostgreSQL database connection closed');
        }
    }

    async list_tickets(): Promise<any[]> {
        const client = new Client(this.dbConfig);
        try {
            await client.connect();
            const result = await client.query('SELECT * FROM ticket');
            return result.rows;
        } finally {
            await client.end();
        }
    }
}
