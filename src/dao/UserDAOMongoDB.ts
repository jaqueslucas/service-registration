// server/src/dao/UserDAOMongoDB.ts
import { MongoClient } from 'mongodb';
import { UserDAO } from './UserDAO';
import { SingletonLogger } from '../utils/Logger';

const logger = SingletonLogger.getInstance();

export class UserDAOMongoDB implements UserDAO {
    private dbConfig = {
        url: 'mongodb://127.0.0.1:27017',
        dbName: 'p3'
    };

    async insert_ticket(natureza: string, descricao: string, provedor: string): Promise<void> {
        const client = new MongoClient(this.dbConfig.url);
        let data = { natureza, descricao, provedor };
        console.log(data); // debug

        try {
            await client.connect();
            console.log('Successfully connected to the database');
            logger.info('Successfully connected to the MongoDB database');
            
            const database = client.db(this.dbConfig.dbName);
            const collection = database.collection('ticket');
            await collection.insertOne(data);
            console.log('Data successfully inserted');
            logger.info(`Data successfully inserted: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error executing the query', error);
            logger.error(`Error executing the query: ${error}`);
        } finally {
            await client.close();
            console.log('Database connection closed');
            logger.info('MongoDB database connection closed');
        }
    }

    async list_tickets(): Promise<any[]> {
        const client = new MongoClient(this.dbConfig.url);
        try {
            await client.connect();
            const database = client.db(this.dbConfig.dbName);
            const collection = database.collection('ticket');
            const tickets = await collection.find().toArray();
            return tickets;
        } finally {
            await client.close();
        }
    }
}
