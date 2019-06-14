const express = require('express');
const cors = require('cors');
const dbMiddleware = require('./db.middleware');
const booksRouter = require('./books.router');
const cartRouter = require('./cart.router');
const userRouter = require('./user.router');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(dbMiddleware);
app.use('/books', booksRouter);
app.use('/', cartRouter);
app.use('/user', userRouter);

const PORT = 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
