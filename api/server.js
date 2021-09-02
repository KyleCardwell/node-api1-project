// BUILD YOUR SERVER HERE
const Users = require('./users/model')

const express = require('express');

const server = express();

server.use(express.json())

// ENDPOINTS
// ENDPOINTS
// ENDPOINTS

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            console.log(user)
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message})
        })
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
