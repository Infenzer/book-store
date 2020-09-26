import Sequelize, { Optional } from 'sequelize'
import { Model } from 'sequelize';
import { sequelize } from "../utils/database";

interface IFavorite {
  id: number
  bookId: string
}
interface FBookCreationAttributes extends Optional<IFavorite, "id">{}
interface FavoriteInstance extends Model<IFavorite, FBookCreationAttributes>, IFavorite{}

export const Favorite = sequelize.define<FavoriteInstance>('favorite-book', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bookId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})