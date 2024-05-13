import { config } from 'dotenv';
import clothesDesignLogger from './clothesDesignLogger.js';

config();

let logger = null;

if (process.env.NODE_ENV !== 'production') {
    logger = clothesDesignLogger();
  }

export default logger;