<script lang="ts">
  import { io } from 'socket.io-client'
  import { onDestroy, onMount } from 'svelte'

  let roomname = 'room1'
  $: enteredRoom = ''
  let message = ''
  const randomAdjective = [
    '멋진',
    '귀여운',
    '아기자기한',
    '화가난',
    '근육질',
    '자다깬',
    '시끄러운',
    '초롱초롱한',
    '자신감있는',
    '끈질긴',
    '이해심많은',
    '친절한',
    '사려깊은',
    '침착한',
    '용감한',
    '지적인',
    '긍정적인',
    '수줍은',
    '엉뚱한',
    '빛나는'
  ]
  const randomNick = [
    '물범',
    '호랑이',
    '벌꿀오소리',
    '알파카',
    '강아지',
    '고래',
    '고릴라',
    '기린',
    '나무늘보',
    '돌고래',
    '너구리',
    '미어캣',
    '아르마딜로',
    '바다코끼리',
    '수달',
    '담비',
    '북극여우',
    '사슴',
    '송아지',
    '쌍봉낙타',
    '토끼',
    '진돗개'
  ]
  let nickname = [
    randomAdjective[Math.floor(Math.random() * randomAdjective.length)],
    randomNick[Math.floor(Math.random() * randomNick.length)]
  ].join(' ')
  let lastReceivedNickname = ''
  let notiNumber = 0
  let openRooms: string[]
  $: openRooms = []
  $: countUser = 0

  let socket = io()
  socket.on('welcome', (nick, num) => {
    countUser = num
    addSystemMessage(`${nick} is joining the `)
  })
  socket.on('bye', (nick, num) => {
    countUser = num
    addSystemMessage(`${nick} is left the `)
  })
  socket.on('change_rooms', (msg) => {
    openRooms = [...new Set(['public', ...msg])]
    // addSystemMessage(`${JSON.stringify(msg)} changed`)
  })
  // room enter
  function nickname_keydown(e: KeyboardEvent) {
    const nicknameDiv = e.target as HTMLDivElement
    if (e.keyCode == 13) {
      e.preventDefault()
      if (nickname === '') nicknameDiv.focus()
      else focusRoomName()
    }
  }
  function roomEnter_keydown(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      e.preventDefault()
      roomEnter_button_emit()
    }
  }
  function roomEnter_button_emit() {
    console.log('enter the this : ', roomname)
    socket.emit('enter_room', roomname, nickname, roomEnter_changeFront)
  }
  function roomEnter_changeFront() {
    const room = document.getElementById('room') as HTMLDivElement
    const chat = document.getElementById('chat') as HTMLDivElement
    room.classList.remove('flex')
    room.classList.add('hidden')
    chat.classList.remove('hidden')
    chat.classList.add('flex')
    roomEnter_addSystemMessage()
  }
  function roomEnter_addSystemMessage() {
    const chat = document.getElementById('chat') as HTMLDivElement
    addSystemMessage(`${nickname}(you) is joining the `)
    enteredRoom = roomname
    ;(<HTMLDivElement>chat.firstElementChild).focus()
    console.log(enteredRoom)
  }
  function changeRoom(e: Event) {
    console.log('changeRoom')
    roomname = (<HTMLDivElement>e.target).innerText
    console.log(roomname)
    socket.disconnect()
    socket = io()
    socket.emit('enter_room', roomname, nickname, roomEnter_changeFront)
  }

  // send a message
  function chatEnter_keydown(e: KeyboardEvent) {
    const currentDiv = e.target as HTMLDivElement
    if (e.keyCode == 13) {
      e.preventDefault()
      chatEnter_button()
      currentDiv.focus()
    }
  }
  function chatEnter_button() {
    socket.emit('newMessage', roomname, nickname, message, sendDone)
    lastReceivedNickname = nickname
  }
  function sendDone() {
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="bg-amber-300 rounded-md rounded-br-none w-fit max-w-[50vw] m-1 px-1 ml-auto flex-wrap ">${message}</div>`
    document.getElementById('chat_log')?.appendChild(div)
    message = ''
    autoScroll()
  }
  // recieved message TODO
  socket.on('newMessage', (nick: string, msg: string) => {
    notiNumber++
    if (nick === lastReceivedNickname) {
      const chat_log = document.getElementById('chat_log') as HTMLDivElement
      const laEl = chat_log.lastElementChild as HTMLDivElement
      const msgdiv = laEl.querySelector('.msgBox') as HTMLDivElement
      msgdiv.innerHTML =
        msgdiv.innerHTML +
        `<div
          class="bg-indigo-300 rounded-lg rounded-tl-none w-fit max-w-[50vw] px-1 mr-auto flex-wrap mb-1"
        >
          ${msg}
        </div>`
    } else {
      addPeopleMessage(nick, msg)
    }
    lastReceivedNickname = nick
  })
  function addPeopleMessage(nick: string, msg: string) {
    const template = `<div class="flex gap-1 m-px">
        <div class="bg-slate-300 rounded-lg h-10 w-10"></div>
        <div class="msgBox">
          <div class="text-gray-400 text-sm items-end">${nick}</div>
          <div
            class="bg-indigo-300 rounded-lg rounded-tl-none w-fit max-w-[50vw] px-1 mr-auto flex-wrap mb-1"
          >
            ${msg}
          </div>
        </div>
      </div>`
    const div = document.createElement('div')
    div.innerHTML = template
    const chat_log = document.getElementById('chat_log')
    chat_log?.appendChild(div)
  }
  // system message
  function makeSystemMessage(newMessage: string) {
    const div = document.createElement('div')
    const chat_container = document.getElementById('chat_log') as HTMLDivElement
    div.classList.add('text-red-500')
    div.classList.add('text-sm')
    div.classList.add('flex')
    div.classList.add('justify-center')
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
      msgdiv.classList.add('text-slate-400')
    }, 3000)
  }

  // auto focus, disconnect, scroll
  onMount(() => {
    focusRoomName()
    socket.emit('on_socket_page')
  })
  function focusRoomName() {
    const roomnameDiv = document.getElementById('roomname') as HTMLDivElement
    roomnameDiv.focus()
  }
  onDestroy(() => {
    socket.disconnect()
    enteredRoom = ''
  })
  function autoScroll() {
    const chat_log = document.getElementById('chat_log') as HTMLDivElement
    if (!chat_log) return
    chat_log.scrollTop = chat_log.scrollHeight
  }
</script>

<svelte:head>
  <title>{notiNumber} RoomChat({countUser})</title>
</svelte:head>

<div class="m-10">
  <div class="flex justify-center text-xl gap-2 items-start">
    <div class="bg-teal-300 rounded-lg px-1">{nickname}</div>
    <div class="flex justify-center gap-1">
      <div
        class="rounded-full bg-rose-400 text-white text-sm w-7 h-7 flex justify-center items-center"
      >
        {notiNumber}
      </div>
    </div>
  </div>
  <div class="flex justify-center gap-2 m-1">
    open rooms :
    {#each openRooms as room}
      <div
        class="
        {room === enteredRoom ? 'bg-rose-300' : 'bg-lime-300'}
        rounded-lg px-1"
      >
        {room}
      </div>
    {/each}
    <div>
      {countUser}
    </div>
  </div>
  <!-- 채팅 -->
  <div
    id="chat_log"
    class="[flex flex-col] m-5 gap-1 px-2 items-center bg-gradient-to-r from-slate-100 to-slate-400 rounded-lg h-[60vh] text-white overflow-y-auto"
  />
  <!-- 닉네임, 룸네임 -->
  <div
    id="room"
    class="flex m-5 gap-5 px-2 items-center bg-gradient-to-r from-rose-300 to-indigo-400 rounded-md"
  >
    <div
      bind:textContent={nickname}
      on:keydown={nickname_keydown}
      contenteditable="true"
      class=" text-white text-xl w-fit p-1 outline-none focus:text-red-500"
    />
    <div
      id="roomname"
      bind:textContent={roomname}
      contenteditable="true"
      on:keydown={roomEnter_keydown}
      class=" text-white text-xl grow p-1 outline-none focus:text-red-500"
    />
    <button
      class="btn btn-ghost btn-sm text-violet-200 hover:bg-amber-400 hover:text-white"
      on:click={roomEnter_button_emit}>enter</button
    >
  </div>
  <!-- 채팅바 -->
  <div
    id="chat"
    class="hidden m-5 gap-5 px-2 items-center bg-gradient-to-r from-white to-slate-400 rounded-md transition-all duration-700"
  >
    <div
      bind:textContent={message}
      contenteditable="true"
      on:keydown={chatEnter_keydown}
      on:focus={() => {
        notiNumber = 0
      }}
      class="peer text-slate-700 text-xl grow p-1 outline-none focus:text-rose-400"
    />
    <button
      class="btn btn-ghost btn-sm text-violet-200 hover:bg-amber-400 hover:text-white"
      on:click={chatEnter_button}>send</button
    >
  </div>
</div>
