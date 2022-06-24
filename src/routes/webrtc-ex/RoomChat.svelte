<script lang="ts">
  import { io } from 'socket.io-client'
  import { onDestroy } from 'svelte'

  let roomname = 'room1'
  let message = ''

  const socket = io()
  socket.on('welcome', () => {
    addSystemMessage('someone is joining the ')
  })
  socket.on('bye', () => {
    addSystemMessage('someone is left the ')
  })
  function roomEnter_keydown(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      e.preventDefault()
      roomEnter_button()
    }
  }
  function roomEnter_button() {
    console.log('enter the this : ', roomname)
    socket.emit('enter_room', roomname, enteredDone)
  }
  function enteredDone(bMsg?: string) {
    console.log('emit backend process says:', bMsg)
    const room = document.getElementById('room') as HTMLDivElement
    const chat = document.getElementById('chat') as HTMLDivElement
    room.classList.remove('flex')
    room.classList.add('hidden')
    chat.classList.remove('hidden')
    chat.classList.add('flex')

    addSystemMessage('you are joining the ')
  }
  function chatEnter_keydown(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      e.preventDefault()
      chatEnter_button()
    }
  }
  function chatEnter_button() {
    console.log('send')
  }
  function makeSystemMessage(newMessage: string) {
    const div = document.createElement('div')
    const chat_container = document.getElementById('chat_log') as HTMLDivElement
    div.classList.add('text-red-500')
    div.classList.add('transition-all')
    div.classList.add('duration-1000')
    const time = new Date()
    const [hh, mm] = [time.getHours(), time.getMinutes()]
    div.innerText = `${hh}:${mm} ${newMessage} ${roomname}`
    chat_container.appendChild(div)
    return div
  }
  function addSystemMessage(newMessage: string) {
    const msgdiv = makeSystemMessage(newMessage)
    setTimeout(() => {
      msgdiv.classList.remove('text-red-500')
      msgdiv.classList.add('text-slate-200')
    }, 3000)
  }

  onDestroy(() => {
    socket.disconnect()
  })
</script>

<div class="m-10">
  <div class="flex justify-center text-3xl dura">{roomname}</div>
  <!-- 채팅 -->
  <div
    id="chat_log"
    class="flex flex-col m-5 gap-1 px-2 items-center bg-gradient-to-r from-rose-300 to-indigo-400 rounded-md h-[60vh] text-white "
  />
  <div
    id="room"
    class="flex m-5 gap-5 px-2 items-center bg-gradient-to-r from-rose-300 to-indigo-400 rounded-md"
  >
    <div
      bind:textContent={roomname}
      contenteditable="true"
      on:keydown={roomEnter_keydown}
      class=" text-white text-3xl grow p-1 outline-none focus:text-red-500"
    />
    <button
      class="btn btn-ghost btn-sm text-violet-200 hover:bg-amber-400 hover:text-white"
      on:click={roomEnter_button}>enter</button
    >
  </div>
  <div
    id="chat"
    class="hidden m-5 gap-5 px-2 items-center bg-gradient-to-r from-rose-300 to-indigo-400 rounded-md"
  >
    <div
      bind:textContent={message}
      contenteditable="true"
      on:keydown={chatEnter_keydown}
      class=" text-white text-3xl grow p-1 outline-none focus:text-red-500"
    />
    <button
      class="btn btn-ghost btn-sm text-violet-200 hover:bg-amber-400 hover:text-white"
      on:click={chatEnter_button}>send</button
    >
  </div>
</div>
