const express = require('express');
const app = express();

const todoService = require('./services/todo.service')

app.listen(3030, () => console.log('Server ready at port 3030!'));

app.use(express.static('public'))

app.get('/api/todo', (req, res) => {
    todoService.query()
        .then(todos => res.send(todos))
});

app.get('/api/todo/save', (req, res) => {
    const todo = {
        txt: req.query.txt,
        importance: req.query.importance,
        completed: req.query.completed,
        color: req.query.color
    }
    todoService.add(todo)
        .then(newTodo => res.send(newTodo))

});

app.get('/api/todo/update', (req, res) => {
    const id = req.query.id
    const val = req.query.val
    const toUpdate = req.query.toUpdate
    console.log('server got =', id, 'val:', val,'will update',toUpdate)
    todoService.update(id,val,toUpdate)
    .then(todos=> res.send(todos))
})

app.get('/api/todo/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    todoService.getTodoById(todoId)
        .then((todo) => {
            res.send(todo)
        })
});

app.get('/api/todo/:todoId/remove', (req, res) => {
    const id = req.params.todoId;
    todoService.remove(id)
        .then(() => {
            res.send('Removed!')
        })
});