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
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user) {

                res.status(404).json({ message: "The user with the specified ID does not exist" })

            } else {

                res.json(user)
            }
        })
        .catch(err => {

            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {

        res.status(400).json({ message: "Please provide name and bio for the user" })

    } else {

        Users.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })
    }
})

server.put('/api/users/:id', (req, res) => {
    if(!req.body.name || !req.body.bio) {

          res.status(400).json({ message: "Please provide name and bio for the user" })   

    } else {

        Users.update(req.params.id, req.body)
            .then(user => {
                if(!user) {
                    
                    res.status(404).json({ message: "The user with the specified ID does not exist" })

                } else {

                    res.status(200).json(user)
                }
            })
            .catch(err => {
                res.status(500).json({ message: "The user information could not be modified" })
            })
    }
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(deletedUser => {
            if(!deletedUser) {

                res.status(404).json({ message: "The user with the specified ID does not exist" })

            } else {

                res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
