const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { router: authRouter, authMiddleware } = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);

// Route bảo vệ bằng xác thực
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


const bookRouter = require('./routes/book');
app.use('/books', bookRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
