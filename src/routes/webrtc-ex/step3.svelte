<script lang="ts">
  import { onMount } from 'svelte'
  onMount(() => {
    // 이벤트 리스터 안써도 되네
    startBtn.onclick = createConnection
    stopBtn.onclick = stop
    sendBtn.onclick = send
  })
  let localConnection
  let remoteConnection
  let sendChannel
  let receiveChannel
  let pcConstraint: RTCConfiguration | undefined
  let dataConstraint
  let startBtn: HTMLButtonElement
  let sendBtn: HTMLButtonElement
  let stopBtn: HTMLButtonElement
  let dataChannelSend: HTMLTextAreaElement
  let dataChannelReceive: HTMLTextAreaElement

  function stop() {
    console.log('stop btn clicked')
  }
  function send() {
    console.log('send btn clicked')
  }

  function createConnection() {
    dataChannelSend.placeholder = ''
    let servers = null
    pcConstraint = undefined
    dataConstraint = null
    // trace('Using SCTP based data channels')
    // For SCTP, reliable and ordered delivery is true by default.
    // Add localConnection to global scope to make it visible
    // from the browser console.
    window.localConnection = localConnection = new RTCPeerConnection(servers, pcConstraint)
    // trace('Created local peer connection object localConnection')

    sendChannel = localConnection.createDataChannel('sendDataChannel', dataConstraint)
    // trace('Created send data channel')

    localConnection.onicecandidate = iceCallback1
    sendChannel.onopen = onSendChannelStateChange
    sendChannel.onclose = onSendChannelStateChange

    // Add remoteConnection to global scope to make it visible
    // from the browser console.
    window.remoteConnection = remoteConnection = new RTCPeerConnection(servers, pcConstraint)
    trace('Created remote peer connection object remoteConnection')

    remoteConnection.onicecandidate = iceCallback2
    remoteConnection.ondatachannel = receiveChannelCallback

    localConnection.createOffer().then(gotDescription1, onCreateSessionDescriptionError)
    startButton.disabled = true
    closeButton.disabled = false
  }
</script>

<svelte:head>
  <title>WEBRTC</title>
</svelte:head>

<div class="flex justify-center gap-2">
  <button bind:this={startBtn} class="btn btn-sm btn-primary">start</button>
  <button bind:this={sendBtn} class="btn btn-sm btn-secondary">send</button>
  <button bind:this={stopBtn} class="btn btn-sm btn-warning">stop</button>
</div>

<div class="flex justify-center gap-2 m-2">
  <textarea
    bind:this={dataChannelSend}
    class="bg-amber-200"
    disabled
    placeholder="Press Start, enter some text, then press Send."
  />
  <textarea bind:this={dataChannelReceive} class="bg-teal-200" disabled />
</div>
