const express = require('express')
const app = express()
const port = 3000
const studentController = require("./controller/studentController")
const bookController = require("./controller/bookController")
const borrowController = require("./controller/borrowController")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())

app.get('/', bookController.showAllBooks)
app.get('/students', studentController.showAllStudent)
app.get('/books', bookController.showAllBooks)
app.get('/bookshelves', bookController.showAllBookShelves)
app.get('/histories', borrowController.showHistoryBorrows)
app.post('/books', bookController.addNewBook)
app.post('/students', studentController.addNewStudent)
app.post('/borrows', borrowController.borrowBooks)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})