import { Router } from "express";

const userRouter = Router()

// Получение списка пользователей
userRouter.get('/', (req, res) => {
  res.json({test: 'hello'})
})

// Создание пользователей
userRouter.post('/', (req, res) => {

})

// Удаление пользователя
userRouter.delete('/', (req, res) => {

})

export default userRouter