import express from 'express'

const app = express()

app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  res.send('<h1>OK!</h1>')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
