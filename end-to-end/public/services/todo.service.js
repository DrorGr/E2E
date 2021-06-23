// import axios from "axios"
// const axios = require('axios');

export const todoService = {
    query,
    getTodoById,
    remove,
    add,
    update
}

function query() {
    return axios.get('/api/todo').then(res => res.data)
}

function getTodoById(id) {
    return axios.get(`/api/todo/${id}`).then(res => res.data)
}

function remove(id) {
    return axios.get(`/api/todo/${id}/remove`).then(res => res.data)
}

function add(todo) {
    // console.log('new todo', todo.color)
    const clr = todo.color.substring(1)
    const url = `/api/todo/save?txt=${todo.txt}&importance=${todo.importance}&color=${clr}&completed=${todo.completed}`
    // console.log('url =', url)
    return axios.get(url).then(res => res.data)
}

function update(val, id, toUpdate) {
    if (toUpdate === 'color') val = val.slice(1)
    console.log ('val in fe service =',val)
    const url = `/api/todo/update?id=${id}&val=${val}&toUpdate=${toUpdate}`
    return axios.get(url).then(res => res.data)

}