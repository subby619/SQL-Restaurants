const db = require('better-sqlite3')(':memory:')

describe('using better-sqlite3', () => {
    beforeAll(() => {
        db.prepare('CREATE TABLE restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        const restaurantsInsert = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
        restaurantsInsert.run('Pizza Hut')
        restaurantsInsert.run('Nandos')
    })
    test('reading out of my database', () => {
        const restaurants = db.prepare('SELECT id, name FROM restaurants;').all()
        expect(Array.isArray(restaurants)).toBeTruthy()
        const [row1, row2] = restaurants
        expect(row1.name).toBe('Pizza Hut')
        expect(row2.id).toBe(2)
    })
    test('we can update rows', () => {
        const getRestaurant = db.prepare('SELECT id, name FROM restaurants WHERE id = ?;')
        expect(getRestaurant.get(2).name).toBe('Nandos')
        
        const update = db.prepare('UPDATE restaurants SET name = ? WHERE id = ?;')
        update.run('Pizza Express', 1)

        expect(getRestaurant.get(1).name).toBe('Pizza Express')        
    })
    test('we can also delete!', () => {
        db.prepare('DELETE FROM restaurants WHERE id = 2;').run()
        const restaurants = db.prepare('SELECT id, name FROM restaurants;').all()
        expect(restaurants.length).toBe(1)
    })
})