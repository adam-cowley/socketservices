const uuid = require('uuid');

class NotificationService {

    todoConstructor(app, io) {
        this.app = app
        this.io = io

        this.namespace = this.io.of('notifications');

        if (! Object.keys(this.namespace.connected).length ) {
            throw new Error('Cannot connect to order microservice')
        }
    }

    send(order) {
        // TODO: Communication with notifications service
        return Promise.resolve(order)
    }


}

module.exports = NotificationService