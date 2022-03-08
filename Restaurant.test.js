const Restaurant = require('./Restaurant')

describe("Restaurant", () => {
    test("new restaurant has an id", () => {
        const restaurant = new Restaurant("Bayroot")
        expect(restaurant.id).toBe(1)
    })
    test("Can access all the restaurants", () => {
        expect(Restaurant.all.length).toBe(1)
    })
})