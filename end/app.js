const express = require('express')
const app = express()
const port = 3000
const { Game } = require('./models')

app.get('/', async (req, res) => {
    try {
        const games = await Game.findAll()
        res.send(games)
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})