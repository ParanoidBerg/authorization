const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const port = 4000

app.use(require('./route'))

mongoose
  .connect("mongodb+srv://Deni:2479@cluster0.elkeumb.mongodb.net/todo")
  .then(() => console.log('Успешно соединилсь с MongoDB'))
  .catch(() => console.log('Ошибка при соединении с сервером'))

app.listen(port, () => {
    console.log(`Сервер успешно запущен http://localhost:${port}`)
})
