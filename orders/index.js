const app = require('http').createServer(function(req,res){
    res.write('OK')
    res.end()
})
app.listen(process.env.port || 3002)
