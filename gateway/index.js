const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)


const inventory = io.of('inventory');

inventory.on('connection', socket => {
    console.log('🔌  New Connection', socket.id)

    socket.on('disconnect', () => {
        console.log('🔌  Connection Left')
    })
})

app.get('/products', (req, res) => {
    const ProcessOrder = require('./services/ProcessOrder')
    const service = new ProcessOrder(app, io)

    const customer = {name: "Adam"} // req.user
    const products = [{product_id: 'socks', quantity: 1}] //req.body.products

    service
        .process(customer, products)
        .then(order => res.status(201).json(order))
        .catch(err => {
            console.log(err)
            res.status(422).json(err)
        })
})

server.listen(3000, () => {
    console.log('🚀  Server listening on :3000')
})