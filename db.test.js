const db = require('better-sqlite3')(':memory:')

describe("My DB", () => {
    beforeAll(() => {
        db.prepare('CREATE TABLE restaurants (id INTEGER PRIMARY KEY, name TEXT);').run();
        const restaurantsInsert = db.prepare('INSERT INTO restaurants (name) VALUES (?)')
        restaurantsInsert.run('Bayroot')
        restaurantsInsert.run('Nandos')
    })
    test("can connect OK", () => {
        const rows = db.prepare('SELECT * FROM restaurants;').all()
        expect(rows.length).toBe(2);
        expect(rows[0].name).toBe('Bayroot')
    })
    test("can get a single item", () => {
        const menu = db.prepare('SELECT * FROM menus WHERE id = ?').get(3)
        expect(menu.title).toBe("Desserts")
    })
    test("we can create", () => {
        const insertStatment = db.prepare('INSERT INTO menus (restaurant_id, title) VALUES (?, ?)')
        insertStatment.run(1, 'Wine')
        const newMenu = db.prepare('SELECT * FROM menus WHERE id = ?').get(4)
        expect(newMenu.title).toBe('Wine')
    })
})