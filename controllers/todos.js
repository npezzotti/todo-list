const Todo = require('../models/todo.model');

exports.getTodos = (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            return res.status(400).json({error: err});
        } 
        res.json(todos)
    })
};

// exports.getTodoById = (req, res) => {
//     let id = req.params.id;
//     Todo.findById(id, (err, todo) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(todo)
//     });
// };

exports.getTodoById = (req, res, next, id) => {
    console.log("params middleware")
    Todo.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, todo) => {
        if(err || !todo) {
            return res.status(400).json({ error: err })
        }
        req.todo = todo;
        next();
    })
};

exports.singleTodo = (req, res) => {
    return res.json(req.todo)
}

exports.getTodosByUser = (req, res) => {
    Todo.find({postedBy: req.params.userId})
    .populate("postedBy", "_id name")
    .exec((err, todos) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        };
        res.json(todos.sort((a, b) => {
            if ((a.todo_priority === "High") || (a.todo_priority === "Medium" && b.todo_priority === "Low")) return -1
            else if (a.todo_priority === b.todo_priority) return 0
            else return 1 
        }));
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
    Todo.findById(req.todo._id, (err, todo) => {
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
    Todo.findByIdAndDelete({_id: req.todo._id}, function(err, todo){
        if (err) res.json(err);
        else res.send('Successfully removed');
    });
}

exports.isAuthor = (req, res, next) => {
    console.log(req.todo, req.auth)
    let isAuthor = req.todo && req.auth && req.todo.postedBy._id == req.auth._id
    if (!isAuthor) {
        return res.status(403).json({
            error: "You are not authorized to make changes on this account."
        })
    }
    next();
}