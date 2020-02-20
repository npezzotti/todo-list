const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 3001;
const path = require('path')


mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
.then(() => console.log('Connected to MongoDB'))

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err.message)
})


app.use(cors({ origin: "https://my-taskmanager.herokuapp.com" }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(logger('dev'));
app.use(cookieParser());

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'You are not authorized to do this.' });
    }
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {    
        res.sendfile(path.resolve(__dirname = 'client', 'build', 'index.html'));  
    })
}


app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});