import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.NEXT_PUBLIC_DB_NAME, // Sesuaikan nama variabel lingkungan dengan "NEXT_PUBLIC_"
  process.env.NEXT_PUBLIC_DB_USER, // Sesuaikan nama variabel lingkungan dengan "NEXT_PUBLIC_"
  process.env.NEXT_PUBLIC_DB_PASSWORD, // Sesuaikan nama variabel lingkungan dengan "NEXT_PUBLIC_"
  {
    host: process.env.NEXT_PUBLIC_DB_HOST, // Sesuaikan nama variabel lingkungan dengan "NEXT_PUBLIC_"
    dialect: 'mysql',
  }
);

export default db;
