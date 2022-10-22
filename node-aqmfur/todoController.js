const express = require('express')
const route = express.Router;

route.get('/todo', (req, res) => {
    res.json({ message: 'Welcome', params: req.query})
})

route.post('/todo', (req, res) => {
    res.json(req.body)
})

route.put('/todo/:id', (req, res) =>{
    res.json(req.params)
})

route.get('/todo/:id', (req, res) =>{
    res.json(req.params)
})

route.delete('/todo/:id', (req, res) => {
    res.json(req.params)
})

module.exports = route