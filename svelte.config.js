import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'
// import { webSocketServer } from './publicChat.js'
import { Server } from 'socket.io'

function publicRooms(io) {
  const {
    sockets: {
      adapter: { sids, rooms }
    }
  } = io
  const publicRooms = []
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key)
    }
  })
  return publicRooms
}
function countUser(io, roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size
}
export const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

    io.on('connection', (socket) => {
      socket.onAny((event) => {
        console.log('event:', event)
      })
      socket.on('on_socket_page', () => {
        io.sockets.emit('change_rooms', publicRooms(io))
      })
      socket.on(
        'enter_room',
        /** @type {(roomName:string, nickname:string, done:()=>void)=>void}  */
        (roomName, nickname, done) => {
          socket.nickName = nickname
          socket.join(roomName)
          console.log(socket.rooms)
          done()
          // 메시지 브로드캐스팅은 자기자신을 제외한 사람에게 보냄.
          socket.to(roomName).emit('welcome', nickname, countUser(io,roomName))

          // room 생성 정보 브로드캐스팅
          io.sockets.emit('change_rooms', publicRooms(io))
        }
      )
      socket.on(
        'newMessage',
        /** @type {(room:string, nick:string, msg:string, sendDone:()=>void)=>void} */
        (room, nick, msg, sendDone) => {
          sendDone()
          socket.to(room).emit('newMessage', nick, msg)
        }
      )
      socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
          socket.to(room).emit('bye', socket.nickName, countUser(io, room)-1)
        })
      })
      socket.on('disconnect', () => {
        io.sockets.emit('change_rooms', publicRooms(io))
      })
    })
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [webSocketServer],
      resolve: {
        alias: {
          $lib: path.resolve('./src/lib'),
          $lowApi: path.resolve('./src/backend/lowdb/api'),
          $routes: path.resolve('./src/routes'),
          $backend: path.resolve('./src/backend'),
          $frontend: path.resolve('./src/frontend')
        }
      }
    }
  }
}

export default config
