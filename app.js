const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());

const bookRouter = require('./routes/book');
app.use('/books', bookRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
