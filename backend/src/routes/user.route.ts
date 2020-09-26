import { Router } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt'
import validator from 'validator';
import jwt from 'jsonwebtoken'
import config from 'config'
import { v4 as uuid } from 'uuid'

interface IUserBody {
  email: string
  password: string
}

const userRouter = Router()

// Получение пользователя
userRouter.post<ParameterDecorator, any, IUserBody>('/login', async (req, res) => {
  try {
    const {password, email} = req.body
    const emailValid = validator.isEmail(email)
    const passwordValid = validator.isLength(password, {min: 3})

    if (!emailValid || !passwordValid) {
      return res.status(400).json({
        message: 'Некорректные данные при авторизации'
      })
    }

    const user = await User.findOne({ where: {email} })
    if (!user) {
      return res.status(400).json({ message: 'Такого пользователя не существует' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' })
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get('secret'),
      {expiresIn: '60d'}
    )

    // RefreshToken
    const refreshToken = uuid()
    user.update({ refreshToken })

    res.status(200).json({ 
      message: 'Авторизация прошла успешно', 
      token, 
      id: user.id,
      refreshToken, 
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Ошибка при авторизации'
    })
  }
})

// Создание пользователя
userRouter.post<ParameterDecorator, any, IUserBody>('/register', async (req, res) => {
  try {
    const {email, password} = req.body
    const emailValid = validator.isEmail(email)
    const passwordValid = validator.isLength(password, {min: 3})

    if (!emailValid || !passwordValid) {
      return res.status(400).json({
        message: 'Некорректные данные при регистрации'
      })
    }

    const candidat = await User.findOne({ where: {email} })
    if (candidat) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email: req.body.email,
      password: hashPassword,
    })

    res.status(201).json({ message: 'Пользователь создан',  id: user.id})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Ошибка при регистрации'
    })
  }
})

// Удаление пользователя
userRouter.delete('/delete', (req, res) => {

})

export default userRouter