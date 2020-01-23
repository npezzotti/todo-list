const Todo = require('../models/todo.model');

exports.getTodos = (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            return res.status(400).json({error: err});
        } 
        res.json(todos.sort((a, b) => {
            if ((a.todo_priority === "High") || (a.todo_priority === "Medium" && b.todo_priority === "Low")) return -1
            else if (a.todo_priority === b.todo_priority) return 0
            else return 1 
        }))
    })
};

exports.getTodoById = (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(todo)
    });
};

exports.createTodo = (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
    .then(todo => {
        res.status(200).json({ message: "Todo added succesfully!" })
    })
    .catch(err => {
        res.status(400).json({ error: err })
    });
};

exports.updateTodo = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send("Todo not found");
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_notes = req.body.todo_notes;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!')
            })
            .catch(err => {
                res.status(400).send('Update failed!')
            });
        }
    });
};

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndDelete({_id: req.params.id}, function(err, todo){
        if (err) res.json(err);
        else res.send('Successfully removed');
    });
}