import Sequelize, { Optional } from 'sequelize'
import { Model } from 'sequelize'
import { sequelize } from '../utils/database'
import { Favorite } from './favorite.model'

export interface IUser {
  id: number,
  email: string,
  password: string,
  refreshToken?: string,
}
interface UserCreationAttributes extends Optional<IUser, "id"> {}
interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser{}

export const User = sequelize.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  }
})

User.hasMany(Favorite, {onDelete: 'CASCADE'})