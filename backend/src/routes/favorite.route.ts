import { Router } from "express";
import { Favorite } from "../models/favorite.model";
import { User } from "../models/user.model";

const favoriteRouter = Router()

// Получить книги и списка желаемого
favoriteRouter.get('/',  async (req, res) => {
  try {

  } catch (e) {
    
  }
})

favoriteRouter.post('/', async (req, res) => {
  try {
    
  } catch (e) {
    
  }
})

// Удалить книгу из списка желаемого
favoriteRouter.delete('/', async (req, res) => {
  try {
    
  } catch (e) {
    
  }
})

export default favoriteRouter