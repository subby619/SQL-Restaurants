const Restaurant = require('./Restaurant')

describe("Restaurant", () => {
    test("the new restaurant has an id", () => {
        const restaurant = new Restaurant("Pizza Hut")
        expect(restaurant.id).toBe(1)
    })
    test("access the restaurants", () => {
        expect(Restaurant.all.length).toBe(1)
    })
})