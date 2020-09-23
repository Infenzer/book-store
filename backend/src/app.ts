import express from 'express'
import path from 'path'
import userRouter from './routes/user'
import { sequelize } from './utils/database'

const app = express()

app.use(express.static(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store')))

app.use('/api/user', userRouter)
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store', 'index.html'))
// })

start()

async function start() {
  const PORT = 3000
  
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