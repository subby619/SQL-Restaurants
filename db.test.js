const db = require('better-sqlite3')(':memory:')

describe('better-sqlite3 is used like this', () => {
    beforeAll(() => {
        db.prepare('CREATE TABLE restaurants (id INTEGER PRIMARY KEY, name TEXT);').run()
        const restaurantsInsert = db.prepare('INSERT INTO restaurants (name) VALUES (?);')
        restaurantsInsert.run('Bayroot')
        restaurantsInsert.run('Nandos')
    })
    test('can read out of a database', () => {
        const restaurants = db.prepare('SELECT id, name FROM restaurants;').all()
        expect(Array.isArray(restaurants)).toBeTruthy()
        const [row1, row2] = restaurants
        expect(row1.name).toBe('Bayroot')
        expect(row2.id).toBe(2)
    })
    test('we can update rows', () => {
        const getRestaurant = db.prepare('SELECT id, name FROM restaurants WHERE id = ?;')
        expect(getRestaurant.get(2).name).toBe('Nandos')
        
        const update = db.prepare('UPDATE restaurants SET name = ? WHERE id = ?;')
        update.run('Cheeky Nandos', 2)

        expect(getRestaurant.get(2).name).toBe('Cheeky Nandos')        
    })
    test('we can also delete!', () => {
        db.prepare('DELETE FROM restaurants WHERE id = 2;').run()
        const restaurants = db.prepare('SELECT id, name FROM restaurants;').all()
        expect(restaurants.length).toBe(1)
    })
})