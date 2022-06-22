<script lang="ts">
  import { io } from 'socket.io-client'
  let inputMsg = ''
  let nickname = '멋진물범'
  // 소켓
  const socket = io()
  socket.on('connect', () => {
    console.log('소켓아이디:', socket.id)
    console.log('connected?:', socket.connected)
  })
  socket.on('message', (message) => {
    appendDiv(otherCssOption(makeMsgDiv(message)))
  })
  socket.on('disconnect', () => {
    console.log('server is dead!')
  })

  function sendMessage() {
    appendDiv(usrCssOption(makeMsgDiv(inputMsg)))
    autoScroll()
    socket.send(inputMsg)
    inputMsg = ''
  }
  function makeMsgDiv(msg: string) {
    const newDiv = document.createElement('div')
    newDiv.innerText = msg
    newDiv.classList.add('w-fit')
    newDiv.classList.add('max-w-[200px]')
    newDiv.classList.add('bg-indigo-400')
    newDiv.classList.add('flex-wrap')
    newDiv.classList.add('rounded-md')
    newDiv.classList.add('p-1')
    newDiv.classList.add('m-1')
    newDiv.classList.add('text-white')
    return newDiv
  }
  function usrCssOption(newDiv: HTMLDivElement) {
    newDiv.classList.add('ml-auto')
    newDiv.classList.add('rounded-br-none')
    return newDiv
  }
  function otherCssOption(newDiv: HTMLDivElement) {
    newDiv.classList.add('rounded-bl-none')
    return newDiv
  }
  function appendDiv(newDiv: HTMLDivElement) {
    const msgDiv = document.getElementById('msgDiv') as HTMLDivElement
    if (!msgDiv) return
    msgDiv.appendChild(newDiv)
  }
  function autoScroll() {
    const msgDiv = document.getElementById('msgDiv') as HTMLDivElement
    if (!msgDiv) return
    msgDiv.scrollTop = msgDiv.scrollHeight
  }
  function keydown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      e.preventDefault()
      sendMessage()
    }
  }
</script>

<svelte:head>
  <title>WebRTC Ex - Wisoom</title>
</svelte:head>
<header>
  <h1>wisoom chat</h1>
</header>
<main class="p-10">
  <div class="bg-gradient-to-r from-rose-400 to-purple-400 rounded-md text-white">message-log</div>
  <div
    id="msgDiv"
    class="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-md h-[300px] overflow-y-scroll roun"
  />
  <div class="flex justify-between bg-indigo-200 rounded-md  ">
    <div id="nickname" contenteditable="true" class="outline-none" bind:textContent={nickname} />
    :
    <div
      id="message"
      contenteditable="true"
      class="grow outline-none"
      bind:textContent={inputMsg}
      on:keydown={keydown}
    />
    <button class="btn btn-sm btn-outline" on:click={sendMessage}>send</button>
  </div>
</main>
