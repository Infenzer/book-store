import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store')))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'dist', 'book-store', 'index.html'))
})

app.listen(3000, () => {
  console.log('Server started on port: 3000')
})