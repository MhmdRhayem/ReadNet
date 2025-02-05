import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});