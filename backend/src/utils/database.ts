import { Sequelize } from "sequelize";

const DB_NAME = 'bookStore_db'
const USER_NAME = 'postgres'
const USER_PASSWORD = '1234'

export const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
})