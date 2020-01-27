const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(logger());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});