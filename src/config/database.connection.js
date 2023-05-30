import pg from "pg";
import dotenv from "dotenv";
dotenv.config()

const { DATABASE_URL } = process.env;

const { Pool } = pg;
    
const config = {
    connectionString : DATABASE_URL
}

export const db = new Pool(config);