// Import dependencies
const express = require('express');
const logging = require('./logging')
const app = express();

// Middleware to parse JSON
app.use(express.json());

// 🔹 Logging Middleware
app.use(logging)

// 🔹 In-memory book data
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// 🔹 GET all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// 🔹 GET book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json(book);
});

// 🔹 POST a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 🔹 PUT update book by ID
app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index] = { id: parseInt(req.params.id), ...req.body };
  res.status(200).json(books[index]);
});

// 🔹 DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const deleted = books.splice(index, 1);
  res.status(200).json(deleted[0]);
});

// 🔹 Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// 🔹 Start server
app.listen(3000, () => {console.log('Server is up and runnig on port number 3000...');
});