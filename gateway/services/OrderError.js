class OrderError extends Error {
    constructor(details) {
        super()

        this.message = 'Error Procssing Order'

        this.code = 422
        this.details = details
    }

    toJson() {
        return {
            code: this.code,
            message: this.message,
            details: this.details
        }
    }
}

module.exports = OrderError