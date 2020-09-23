import Sequelize from 'sequelize'
import { sequelize } from '../utils/database'

export const User = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
