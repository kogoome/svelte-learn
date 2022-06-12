<script lang="ts">
  // webrtc 브라우저 환경에 따른 어댑터 모듈
  import 'https://webrtc.github.io/adapter/adapter-latest.js'
  import { onMount } from 'svelte'
  onMount(() => {
    callBtn.disabled = true
    hangupBtn.disabled = true
  })
  let getMediaOption = { video: false, audio: true }
  // 비디오
  let localVideo: HTMLVideoElement
  let remoteVideo: HTMLVideoElement
  // 버튼
  let startBtn: HTMLButtonElement
  let callBtn: HTMLButtonElement
  let hangupBtn: HTMLButtonElement
  // 스트림
  let localStream: MediaStream
  let remoteStream: MediaStream
  // 커넥션
  let localPeerConnection: RTCPeerConnection | null
  let remotePeerConnection: RTCPeerConnection | null

  const offerOptions: RTCOfferOptions = { offerToReceiveVideo: true }
  let startTime: number | null = null

  function gotLocalMediaStream(mediaStream?: MediaStream) {
    if (mediaStream) {
      localStream = mediaStream
      localVideo.srcObject = mediaStream
      trace('Received local stream.')
      callBtn.disabled = false
    }
  }
  function gotRemoteMediaStream(e) {
    // 무슨타입인지 모르겟다. 안나옴
    const mediaStream = e.stream as MediaStream
    remoteVideo.srcObject = mediaStream
    remoteStream = mediaStream
    trace('Remote peer connection received remote stream.')
  }
  function trace(text: string) {
    text = text.trim()
    const now = (window.performance.now() / 1000).toFixed(3)
    console.log(now, text)
  }
  function handleLocalMediaStreamError(e: Error) {
    gotLocalMediaStream()
    console.log('navigator.getUserMedia error: ', e)
  }
  // 비디오 이벤트 함수
  function logVideoLoaded(e: Event) {
    const video = e.target as HTMLVideoElement
    trace(
      `${video.id} videoWidth: ${video.videoWidth}px, ` + `videoHeight: ${video.videoHeight}px.`
    )
  }
  function logResizedVideo(e: Event) {
    logVideoLoaded(e)
    if (startTime) {
      const elapsedTime = window.performance.now() - startTime
      startTime = null
      trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`)
    }
  }
  function handleConnection(e: RTCPeerConnectionIceEvent) {
    const peerConnection = e.target as RTCPeerConnection
    const iceCandidate = e.candidate as RTCIceCandidate

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate)
      const otherPeer = getOtherPeer(peerConnection)
      if (!otherPeer) return new Error("Couldn't find other peer.")
      otherPeer
        .addIceCandidate(newIceCandidate)
        .then(() => {
          handleConnectionSuccess(peerConnection)
        })
        .catch((error) => {
          handleConnectionFailure(peerConnection, error)
        })

      trace(`${getPeerName(peerConnection)} ICE candidate:\n` + `${e.candidate}.`)
    }
  }

  // Logs that the connection succeeded.
  function handleConnectionSuccess(peerConnection: RTCPeerConnection) {
    trace(`${getPeerName(peerConnection)} addIceCandidate success.`)
  }

  // Logs that the connection failed.
  function handleConnectionFailure(peerConnection: RTCPeerConnection, error: Error) {
    trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n` + `${error.toString()}.`)
  }

  // Logs changes to the connection state.
  function handleConnectionChange(event: Event) {
    const peerConnection = event.target as RTCPeerConnection
    console.log('ICE state change event: ', event)
    trace(`${getPeerName(peerConnection)} ICE state: ` + `${peerConnection.iceConnectionState}.`)
  }

  // Logs error when setting session description fails.
  function setSessionDescriptionError(error: Error) {
    trace(`Failed to create session description: ${error.toString()}.`)
  }

  // Logs success when setting session description.
  function setDescriptionSuccess(peerConnection: RTCPeerConnection, functionName: string) {
    const peerName = getPeerName(peerConnection)
    trace(`${peerName} ${functionName} complete.`)
  }

  // Logs success when localDescription is set.
  function setLocalDescriptionSuccess(peerConnection: RTCPeerConnection) {
    setDescriptionSuccess(peerConnection, 'setLocalDescription')
  }

  // Logs success when remoteDescription is set.
  function setRemoteDescriptionSuccess(peerConnection: RTCPeerConnection) {
    setDescriptionSuccess(peerConnection, 'setRemoteDescription')
  }

  // Logs offer creation and sets peer connection session descriptions.
  function createdOffer(description: RTCSessionDescriptionInit) {
    trace(`Offer from localPeerConnection:\n${description.sdp}`)
    trace('localPeerConnection setLocalDescription start.')
    if (!localPeerConnection) return new Error('localPeerConnection is null')
    localPeerConnection
      .setLocalDescription(description)
      .then(() => {
        setLocalDescriptionSuccess(localPeerConnection!)
      })
      .catch(setSessionDescriptionError)

    trace('remotePeerConnection setRemoteDescription start.')
    if (!remotePeerConnection) return new Error('remotePeerConnection is null')
    remotePeerConnection
      .setRemoteDescription(description)
      .then(() => {
        setRemoteDescriptionSuccess(remotePeerConnection!)
      })
      .catch(setSessionDescriptionError)

    trace('remotePeerConnection createAnswer start.')
    remotePeerConnection.createAnswer().then(createdAnswer).catch(setSessionDescriptionError)
  }

  // Logs answer to offer creation and sets peer connection session descriptions.
  function createdAnswer(description: RTCSessionDescriptionInit) {
    trace(`Answer from remotePeerConnection:\n${description.sdp}.`)

    trace('remotePeerConnection setLocalDescription start.')
    if (!remotePeerConnection) return new Error('remotePeerConnection is null')
    remotePeerConnection
      .setLocalDescription(description)
      .then(() => {
        setLocalDescriptionSuccess(remotePeerConnection!)
      })
      .catch(setSessionDescriptionError)

    trace('localPeerConnection setRemoteDescription start.')
    if (!localPeerConnection) return new Error('localPeerConnection is null')
    localPeerConnection
      .setRemoteDescription(description)
      .then(() => {
        setRemoteDescriptionSuccess(localPeerConnection!)
      })
      .catch(setSessionDescriptionError)
  }

  // Handles start button action: creates local MediaStream.
  function startAction() {
    // startBtn.disabled = true
    navigator.mediaDevices
      .getUserMedia(getMediaOption)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError)
    trace('Requesting local stream.')
  }

  // Handles call button action: creates peer connection.
  function callAction() {
    callBtn.disabled = true
    hangupBtn.disabled = false
    trace('Starting call.')
    startTime = window.performance.now()

    // Get local media stream tracks.
    const videoTracks = localStream.getVideoTracks()
    const audioTracks = localStream.getAudioTracks()
    if (videoTracks.length > 0) {
      trace(`Using video device: ${videoTracks[0].label}.`)
    }
    if (audioTracks.length > 0) {
      trace(`Using audio device: ${audioTracks[0].label}.`)
    }

    const servers: RTCConfiguration | undefined = undefined // Allows for RTC server configuration.

    // Create peer connections and add behavior.
    localPeerConnection = new RTCPeerConnection(servers)
    trace('Created local peer connection object localPeerConnection.')

    localPeerConnection.addEventListener('icecandidate', handleConnection)
    localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange)

    remotePeerConnection = new RTCPeerConnection(servers)
    trace('Created remote peer connection object remotePeerConnection.')

    remotePeerConnection.addEventListener('icecandidate', handleConnection)
    remotePeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange)
    remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream)

    // Add local stream to connection and create offer to connect.
    console.log(`\n\n\n\n\n\n\n ${localPeerConnection} \n\n\n\n\n\n`)
    localPeerConnection.addStream(localStream)
    trace('Added local stream to localPeerConnection.')

    trace('localPeerConnection createOffer start.')
    localPeerConnection
      .createOffer(offerOptions)
      .then(createdOffer)
      .catch(setSessionDescriptionError)
  }

  // Handles hangup action: ends up call, closes connections and resets peers.
  function hangupAction() {
    localPeerConnection!.close()
    remotePeerConnection!.close()
    localPeerConnection = null
    remotePeerConnection = null
    hangupBtn.disabled = true
    callBtn.disabled = false
    trace('Ending call.')
  }

  // Gets the "other" peer connection.
  function getOtherPeer(peerConnection: RTCPeerConnection) {
    return peerConnection === localPeerConnection ? remotePeerConnection : localPeerConnection
  }

  // Gets the name of a certain peer connection.
  function getPeerName(peerConnection: RTCPeerConnection) {
    return peerConnection === localPeerConnection ? 'localPeerConnection' : 'remotePeerConnection'
  }
</script>

<svelte:head>
  <title>WEBRTC</title>
</svelte:head>

<div class="flex justify-center gap-2">
  <button bind:this={startBtn} class="btn btn-sm btn-primary" on:click={startAction}>시작</button>
  <button bind:this={callBtn} class="btn btn-sm btn-secondary" on:click={callAction}
    >전화걸기</button
  >
  <button bind:this={hangupBtn} class="btn btn-sm btn-warning" on:click={hangupAction}
    >전화끊기</button
  >
</div>
<div class="flex justify-center gap-2 m-2">
  <video
    bind:this={localVideo}
    id="localVideo"
    autoplay
    playsinline
    loop
    width="320"
    height="240"
    controls
    on:loadedmetadata={logVideoLoaded}
  >
    <track kind="captions" />
  </video>
  <video
    bind:this={remoteVideo}
    id="remoteVideo"
    autoplay
    playsinline
    loop
    width="320"
    height="240"
    controls
    on:loadedmetadata={logVideoLoaded}
    on:resize={logResizedVideo}
  >
    <track kind="captions" />
  </video>
</div>
<div class="flex justify-center gap-2 m-2">
  <textarea
    id="dataChannelSend"
    class="bg-amber-200"
    disabled
    placeholder="Press Start, enter some text, then press Send."
  />
  <textarea id="dataChannelReceive" class="bg-teal-200" disabled />
</div>
