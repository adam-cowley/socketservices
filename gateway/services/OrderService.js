const Order = require('../models/Order');

class OrderService {

    todoConstructor(app, io) {
        this.app = app
        this.io = io

        this.namespace = this.io.of('orders');

        if (! Object.keys(this.namespace.connected).length ) {
            throw new Error('Cannot connect to order microservice')
        }
    }

    create(customer, products) {
        // TODO: Communicate with Service
        const order = new Order(customer, products)

        return Promise.resolve(order)
    }


}

module.exports = OrderService