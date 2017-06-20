const uuid = require('uuid');

class Order {

    constructor(customer, products) {
        this.order_id = uuid.v4()
        this.customer = customer
        this.products = products
    }

    toJson() {
        const {order_id, customer, products} = this;

        return {
            order_id,
            customer,
            products
        }
    }

}

module.exports = Order