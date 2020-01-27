const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_notes: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Todo', Todo);
