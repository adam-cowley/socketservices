const InventoryService = require('./InventoryService')
const OrderService = require('./OrderService')
const NotificationService = require('./NotificationService')
const OrderError = require('./OrderError')


class ProcessOrder {
    constructor(app, io) {
        this.app = app
        this.io = io
    }

    process(customer, products = []) {
        const order_id = require('uuid').v4()

        const inventory = new InventoryService(this.app, this.io)
        const orders = new OrderService(this.app, this.io)
        const notifications = new NotificationService(this.app, this.io)

        // Contact inventory
        return Promise.all(products.map(product => {
            return inventory.check(product.product_id, product.quantity)
        }))

        // Check For Errors
        .then(products => this.checkErrors(products))

        // Place Order
        .then(products => orders.create(customer, products))

        // Send Order Notification
        .then(order => notifications.send(order))

        // Update Inventory
        .then(order => inventory.decrementQuantities(order))

    }

    checkErrors(products) {
        const errors = {};

        products.forEach(product => {
            if (product.error) {
                errors[ product.product_id ] = [ product.error ]
            }
        })

        if ( Object.keys(errors).length ) {
            throw new OrderError(errors)
        }

        return products
    }


}

module.exports = ProcessOrder