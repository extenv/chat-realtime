const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/chat.html')
})
let UserOnline = 1
io.on('connection', socket => {
    socket.on('join', param => {
       UserOnline++;
        io.emit('UserOnline', UserOnline)
    })
    socket.on('message', param => {
        io.emit('message', param)
    })
    socket.on('disconnect', param => {
        UserOnline--;
        io.emit('UserOnline',UserOnline)

    })
})
server.listen(process.env.PORT || 5000)
