import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'
// import { webSocketServer } from './publicChat.js'
import { Server } from 'socket.io'

export const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

    io.on('connection', (socket) => {
      socket.onAny((event) => {
        console.log('event:', event)
      })
      socket.on(
        'enter_room',
        /** @type {(roomName:string, done:(msg:string)=>void)=>void}  */
        (roomName, done) => {
          console.log('room name : ', roomName)
          socket.join(roomName)
          console.log(socket.rooms)
          done('it works!')
          // 메시지 브로드캐스팅은 자기자신을 제외한 사람에게 보냄.
          socket.to(roomName).emit('welcome')
        }
      )
      socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
          socket.to(room).emit('bye')
        })
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
