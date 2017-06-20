const uuid = require('uuid');

class InventoryService {
    constructor(app, io) {
        this.app = app
        this.io = io

        this.namespace = this.io.of('inventory')

        if (! Object.keys(this.namespace.connected).length ) {
            throw new Error('Cannot connect to inventory microservice')
        }
    }

    check(product_id, quantity) {
        return new Promise((resolve, reject) => {
            const request_id = uuid.v4()

            this.namespace.emit('status', {
                request_id,
                product_id,
                quantity
            })

            this.listen(request_id, resolve)
        })
    }

    reply(request_id) {
        return `inventory.status::${request_id}`
    }

    listen(request_id, resolve) {
        // There must be a better way to listen on a Namespace...
        Object.keys(this.namespace.sockets).forEach(socket_id => {
            const reply = this.reply(request_id)

            this.namespace.sockets[socket_id].on(reply, data => {
                resolve(data)
                this.ignore(request_id)
            })
        })
    }

    ignore(request_id) {
        Object.keys(this.namespace.sockets).forEach(socket_id => {
            const reply = this.reply(request_id)

            this.namespace.sockets[socket_id].removeAllListeners(reply)
        })
    }

    decrement(product_id, quantity) {
        this.namespace.emit('decrement', {product_id, quantity})
    }

    decrementQuantities(order) {
        return Promise.all(order.products.map(({product_id, quantity}) => {
            return this.decrement(product_id, quantity)
        }))
        .then(() => {
            return order;
        })
    }
}

module.exports = InventoryService