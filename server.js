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
const dotenv = require('dotenv')

dotenv.config()

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(logger());

mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log('DB connection error: ' + err.message)
})

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});