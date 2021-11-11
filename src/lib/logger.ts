import { LoggerAbstract } from "../interfaces/logger";
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
const { combine, timestamp } = format;

class Logger implements LoggerAbstract {
  _logger: WinstonLogger;

  constructor() {
    this._logger = createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
      ),
      transports: [
        new transports.File({ filename: './logs/info.log', level: 'info'}),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/debug.log', level: 'debug' }),
        new transports.File({ filename: './logs/warn.log', level: 'warn' }),
      ],
    });
  }

  log(message: string = ''): void {
    this._logger.info(message);
  }
  debug(message: string = ''): void {
    this._logger.debug(message);
  }
  warn(message: string = ''): void {
    this._logger.warn(message);
  }
  error(message: string = ''): void {
    this._logger.error(message);
  }
}

export default Logger;
