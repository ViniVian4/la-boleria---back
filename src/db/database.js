import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = 'abcd';
const host = 'localhost';
const port = 5432;
const database = 'laboleria';

const connection = new Pool({
    user,
  password,
  host,
  port,
  database
});

export default connection;