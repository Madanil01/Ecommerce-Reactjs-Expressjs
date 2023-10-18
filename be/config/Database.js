import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.NEXT_PUBLIC_DB_NAME,
  process.env.NEXT_PUBLIC_DB_USER,
  process.env.NEXT_PUBLIC_DB_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_DB_HOST,
    dialect: 'mysql',
  }
);

export default db;
