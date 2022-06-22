import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'
import { Server } from 'socket.io'

let sockets = []

export const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

    io.on('connection', (socket) => {
      sockets.push(socket)
      console.log('1.', socket.id)
      console.log('2. a user connected ✅ ')

      socket.on('message', (msg) => {
        sockets.forEach((aSocket) => {
          aSocket.send(msg)
        })
      })

      socket.send('send from server message!!!')

      socket.on('disconnect', () => {
        sockets = []
        console.log('4. user disconnected')
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
