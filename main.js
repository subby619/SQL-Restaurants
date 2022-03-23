const Restaurant = require('./Restaurant')
const Menu = require('./Menu')

Restaurant.init()
Menu.init()

const absurdbird = Restaurant.all[1]
absurdbird.addMenu("Drinks")

console.log(absurdbird)