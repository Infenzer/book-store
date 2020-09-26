import express from 'express'
import path from 'path'
import userRouter from './routes/user.route'
import { sequelize } from './utils/database'
import config from 'config'
import favoriteRouter from './routes/favorite.route'
import cors from 'cors'

const app = express()

// Удалить в продакшене
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store')))
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/favorite', favoriteRouter)
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store', 'index.html'))
// })

start()

async function start() {
  const PORT = config.get('port') || 3000
  
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
    sequelize.close()
  }
}