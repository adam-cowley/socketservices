const app = require('http').createServer(function(req,res){
    res.write('OK')
    res.end()
})
app.listen(process.env.port || 3001)

// Temporary repository
const products = {
    socks: {
        product_id: 'socks',
        quantity: 3,
    },
    shoes: {
        product_id: 'sandals',
        quantity: 0
    }
};

// Delay connection by 1000ms
setTimeout(() => {
    const io = require('socket.io-client')
    const socket = io.connect('http://localhost:3000/inventory');

    socket.on('connect', () => {
        console.log('🔌  Connected as ', socket.id)

        socket.on('status', (data) => {
            console.log('📦  Inventory Status')
            console.log(data);

            // Mock database call and send asyncronous result
            setTimeout(() => {
                const {quantity} = products[data.product_id];

                data.remaining = quantity;

                if ( data.quantity > quantity ) {
                    data.error = 'INSUFFICIENT_STOCK';
                }

                const reply = `inventory.status::${data.request_id}`;

                socket.emit(reply, data)
            }, 200)
        })

        socket.on('decrement', (data) => {
            console.log('⬇️ decrement ', data.product_id, 'by', data.quantity);

            products[data.product_id].quantity--;
        })


    })
    socket.on('disconnect', () => {
        console.log('🔌  Disconnected')
    })
}, 1000)
