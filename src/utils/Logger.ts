// src/utils/Logger.ts
import * as fs from 'fs';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

class SingletonLogger {
    private static instance: SingletonLogger;
    private logFilePath: string = 'app.log';

    private constructor() {
        // Certifica-se de que o arquivo de log exista
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    public static getInstance(): SingletonLogger {
        if (!SingletonLogger.instance) {
            SingletonLogger.instance = new SingletonLogger();
        }
        return SingletonLogger.instance;
    }

    private getBrazilTime(): string {
        const timeZone = 'America/Sao_Paulo'; // Fuso horário do Brasil
        const now = new Date();
        const zonedDate = toZonedTime(now, timeZone); // Converte a data atual para o fuso horário do Brasil
        const pattern = 'yyyy-MM-dd HH:mm:ssXXX'; // Formato desejado
        return format(zonedDate, pattern); // Formata a data no fuso horário do Brasil
    }

    private writeLog(level: string, message: string): void {
        const logMessage = `${this.getBrazilTime()} - ${level} - ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage);
    }

    public debug(message: string): void {
        this.writeLog('DEBUG', message);
    }

    public info(message: string): void {
        this.writeLog('INFO', message);
    }

    public warn(message: string): void {
        this.writeLog('WARN', message);
    }

    public error(message: string): void {
        this.writeLog('ERROR', message);
    }

    public critical(message: string): void {
        this.writeLog('CRITICAL', message);
    }
}

export { SingletonLogger }
