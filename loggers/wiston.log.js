/**
 * @description GHI LOG BASIC
 * ... 
*/
// package
const winston = require('winston');
const { combine, timestamp, printf, align } = winston.format;

// env
const { WINSTON_ENV } = process.env;

// tạo loggers
const logger = winston.createLogger({
      level: WINSTON_ENV || 'debug',   // cái này phải đọc theo trên docs chứ không phải muốn ghi gì ghi
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        align(),
        printf(info => `[${info.timestamp}] ${info.level} : ${info.message}`)
      ),
      transports: [
        new winston.transports.Console(), // ghi log đến console
        
        // ghi log đến file
        new winston.transports.File({ dirname: 'logs', filename: 'dev.log' }),
    ],
  });


// exports
module.exports = logger;