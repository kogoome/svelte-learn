import { Server } from 'socket.io'

let sockets = []

export const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

    io.on('connection', (socket) => {
      socket.on('enter_room', (msg) => {
        console.log(msg)
      })
    })
    // publicChat
    // io.on('connection', (socket) => {
    //   socket.nickname = 'anonymous'
    //   sockets.push(socket)
    //   console.log('1.', socket.id)
    //   console.log('2. a user connected ✅ ')

    //   socket.on('message', (msg) => {
    //     socket.nickname = msg.nick
    //     sockets.forEach((aSocket) => {
    //       aSocket.send(msg)
    //     })
    //   })

    //   socket.send({ nick: 'system', msg: 'welcome websocket!!!' })

    //   socket.on('disconnect', () => {
    //     const i = sockets.findIndex((sk) => sk.nickname === socket.nickname)
    //     sockets.splice(i, 1)
    //     console.log(`4. ${socket.nickname} disconnected`)
    //   })
    // })
  }
}
