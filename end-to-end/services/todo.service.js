const fs = require('fs')
const gTodos = require('../data/todo.json')

// query()

function query() {
    // console.log('gTodos =', gTodos)
    // console.log ('var =',gTodos[0].todos)
    return Promise.resolve(gTodos)
}

function getTodoById(id) {
    const todo = gTodos.find(todo => todo._id === id)
    return Promise.resolve(todo)
}

function remove(id) {
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos.splice(idx, 1)
    return _saveTodosToFile()
}

function update(id, val, field) {
    // console.log('server service got id =', id)
    // console.log('server service got val =', val)
    // console.log('server service got field =', field)
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos[idx][field] = val
    _saveTodosToFile()
    return Promise.resolve(gTodos)

}

function add(todo) {
    todo._id = _makeId()
    gTodos.unshift(todo)
    return _saveTodosToFile()
        .then(() => {
            return todo
        })
}

function _saveTodosToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/todo.json', JSON.stringify(gTodos, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!');
                resolve()
            }
        });
    })

}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

module.exports = {
    query,
    getTodoById,
    remove,
    add,
    update
}