const Menu = require('./Menu')

const db = require('better-sqlite3')('./db.sqlite')

class Restaurant {
    static all = []
    static init = function () {
        db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        const restaurants = db.prepare('SELECT * FROM restaurants;').all()
        restaurants.forEach(restaurant => {
            const { id, name, imageURL} = restaurant
            const restaurantInstance = new Restaurant(name, imageURL, id)
            const menusRows = db.prepare('SELECT * FROM menus WHERE restaurant_id = ?;').all(restaurantInstance.id)
            
            menusRows.forEach(menuRow => {
                const { id, title, restaurant_id } = menuRow
                const menuInstance = new Menu(restaurant_id, title, id)
                restaurantInstance.menus.push(menuInstance)
            })
        })
    }
    
    constructor(name, imageURL, id) {
        this.name = name
        this.imageURL = imageURL
        this.menus = []
        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
            const info = insert.run(this.name)
            this.id = info.lastInsertRowid
        }
        Restaurant.all.push(this)
    }

    addMenu(menuTitle) {
        const menu = new Menu(this.id, menuTitle)
        this.menus.push(menu)
    }
}

module.exports = Restaurant