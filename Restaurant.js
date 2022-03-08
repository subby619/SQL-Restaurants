const db = require('better-sqlite3')(':memory:')

class Restaurant {
    static all = []
    constructor(name) {
        this.name = name
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        const insert = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
        const info = insert.run(this.name)
        this.id = info.lastInsertRowid
        Restaurant.all.push(this)
    }
}

module.exports = Restaurant