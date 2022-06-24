<script lang="ts">
  import { io } from 'socket.io-client'
  import { onDestroy } from 'svelte'
  let inputMsg = ''
  const randomAdjective = [
    '멋진',
    '귀여운',
    '아기자기한',
    '화가난',
    '근육질',
    '침흘리는',
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
    '속좁은',
    '수줍은',
    '엉뚱한'
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
    randomAdjective[Math.round(Math.random() * randomAdjective.length)],
    randomNick[Math.round(Math.random() * randomNick.length)]
  ].join(' ')

  // 소켓
  const socket = io()
  socket.on('connect', () => {
    console.log('소켓아이디:', socket.id)
    console.log('connected?:', socket.connected)
  })
  socket.on('message', (data) => {
    if (data.nick === nickname) return
    if (data.nick === 'system')
      appendDiv(otherCssOption(makeMsgDiv(data.nick + ':' + data.msg), 'text-rose-300'))
    else appendDiv(otherCssOption(makeMsgDiv(data.nick + ':' + data.msg)))
  })
  socket.on('disconnect', () => {
    console.log('server is dead!')
  })

  function sendMessage() {
    appendDiv(usrCssOption(makeMsgDiv(inputMsg)))
    autoScroll()
    socket.send({ nick: nickname, msg: inputMsg })
    inputMsg = ''
  }
  function makeMsgDiv(msg: string) {
    const newDiv = document.createElement('div')
    newDiv.innerText = msg
    newDiv.classList.add('w-fit')
    newDiv.classList.add('max-w-[200px]')
    newDiv.classList.add('flex-wrap')
    newDiv.classList.add('rounded-md')
    newDiv.classList.add('p-1')
    newDiv.classList.add('m-1')
    newDiv.classList.add('text-white')
    return newDiv
  }
  function usrCssOption(newDiv: HTMLDivElement) {
    newDiv.classList.add('bg-amber-400')
    newDiv.classList.add('ml-auto')
    newDiv.classList.add('rounded-br-none')
    return newDiv
  }
  function otherCssOption(newDiv: HTMLDivElement, bgColor?: string) {
    const bg = bgColor ? bgColor : 'bg-indigo-400'
    newDiv.classList.add(bg)
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

  onDestroy(() => {
    socket.send({ nick: 'system', msg: `${nickname}님이 접속을 종료했습니다.` })
    socket.disconnect()
  })
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
  <div class="flex justify-between bg-indigo-200 rounded-md items-baseline ">
    <div
      id="nickname"
      contenteditable="true"
      class="outline-none pl-1"
      bind:textContent={nickname}
    />
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
