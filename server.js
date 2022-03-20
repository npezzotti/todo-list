const tracer = require('dd-trace').init({
    runtimeMetrics: true,
    logInjection: true,
    env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
    tags: { 
      creator: 'Nathan Pezzotti'
    },
    service: 'my-todo-list',
});

tracer.use('express', {
    hooks: {
        request: (span, req, res) => {
            if (req.body) {
                if (req.body.password) delete req.body.password;
                span.setTag('request.body', req.body);
            };
        }
    }
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 3001;
const path = require('path');
const logger = require('./utils/winston');

// DATABASE CONFIG
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connected to MongoDB Atlas'));

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err.message}`);
});

// MIDDLEWARE
app.set('trust proxy', true);
if (process.env.NODE_ENV !== 'production') app.use(cors({ origin: "http://127.0.0.1:3000" }));
app.use(bodyParser.json());
app.use(expressValidator()); 
app.use(cookieParser());
app.use(require('morgan')('combined', { stream: logger.stream }));

// ROUTES
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// AUTH ERROR HANDLER
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'You are not authorized to do this.' });
    };
});

// PRODUCTION SETTINGS FOR CLIENTS
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {    
        res.sendFile(path.resolve(__dirname = 'client', 'build', 'index.html'));  
    });
};

// SERVER
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});