const { Game } = require('../models')

class Controller {
    static async read() {
        try {
            const games = await Game.findAll()
            res.send(games)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller