<script lang="ts">
  // webrtc 브라우저 환경에 따른 어댑터 모듈
  import 'https://webrtc.github.io/adapter/adapter-latest.js'
  // Dom binding ------------------------------------------------------------------------
  let displayVideo: HTMLVideoElement
  let localVideo: HTMLVideoElement
  let remoteVideo: HTMLVideoElement
  let displayBtn: HTMLButtonElement
  let mediaBtn: HTMLButtonElement
  let callBtn: HTMLButtonElement
  let hangupBtn: HTMLButtonElement
  // getStream --------------------------------------------------------------------------
  let streamState: { [key: string]: boolean } = { display: false, cam: false, mic: false }
  let mediaStreamConstraints = { video: false, audio: true }
  let localDisplayStream: MediaStream
  let localStream: MediaStream
  let remoteStream: MediaStream

  // display, mic button action
  function displayAction() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((mediaStream) => {
        localMediaStreamMonitering('display', mediaStream)
      })
      .catch(handleLocalMediaStreamError)
    // trace('Requesting local dispaly media stream.')
  }
  function mediaAction() {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((mediaStream) => localMediaStreamMonitering('media', mediaStream))
      .catch(handleLocalMediaStreamError)
    // trace('Requesting local audio media stream.')
  }

  function localMediaStreamMonitering(option: 'display' | 'media', mediaStream?: MediaStream) {
    if (!mediaStream) return new Error('미디어스트림이 없습니다.')
    switch (option) {
      case 'display':
        localDisplayStream = mediaStream
        displayVideo.srcObject = mediaStream
        streamState.display = true
        // trace('Received local stream.')
        break
      case 'media':
        localStream = mediaStream
        localVideo.srcObject = mediaStream
        streamState.cam = mediaStreamConstraints.video
        streamState.mic = mediaStreamConstraints.audio
        // trace('Received local stream.')
        break
    }
    // 비디오 또는 오디오 공유가 준비됐으므로 콜버튼 활성화
    callBtn.disabled = false
  }

  // 커넥션 ------------------------------------------------------------------------------
  let localPeerConnection: RTCPeerConnection | null
  let remotePeerConnection: RTCPeerConnection | null
  const offerOptions: RTCOfferOptions = { offerToReceiveVideo: true }
  // 퍼포먼스 측정용 -----------------------------------------------------------------------
  let startTime: number | null = null

  // Handles call button action: --------------------------------------------------------
  function callAction() {
    // 버튼 활성화
    callBtn.disabled = true
    hangupBtn.disabled = false
    trace('Starting call.')
    startTime = window.performance.now()

    const trueStreamState = Object.keys(streamState).map((key) => {
      if (streamState[key] === true) return key
    })
    console.log(localDisplayStream.getVideoTracks())
    const videoTracks =
      trueStreamState[0] === 'display'
        ? localDisplayStream.getVideoTracks()
        : localStream.getVideoTracks()
    const audioTracks = localStream.getAudioTracks()
    // if (videoTracks.length > 0) {
    //   trace(`Using video device: ${videoTracks[0].label}.`)
    // }
    // if (audioTracks.length > 0) {
    //   trace(`Using audio device: ${audioTracks[0].label}.`)
    // }

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
    localPeerConnection.addStream(localStream)
    trace('Added local stream to localPeerConnection.')

    trace('localPeerConnection createOffer start.')
    localPeerConnection
      .createOffer(offerOptions)
      .then(createdOffer)
      .catch(setSessionDescriptionError)
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
  <button bind:this={displayBtn} class="btn btn-sm btn-primary" on:click={displayAction}>
    화면공유
  </button>
  <button bind:this={mediaBtn} class="btn btn-sm btn-primary" on:click={mediaAction}>
    비디오공유
  </button>
  <button bind:this={callBtn} class="btn btn-sm btn-secondary" disabled on:click={callAction}>
    전화걸기
  </button>
  <button bind:this={hangupBtn} class="btn btn-sm btn-warning" disabled on:click={hangupAction}>
    전화끊기
  </button>
</div>
<div class="flex justify-center gap-2 m-2">
  <video
    bind:this={displayVideo}
    id="displayVideo"
    autoplay
    playsinline
    width="320"
    height="240"
    controls
    on:loadedmetadata={logVideoLoaded}
  >
    <track kind="captions" />
  </video>
  <video
    bind:this={localVideo}
    id="localVideo"
    autoplay
    playsinline
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
    width="320"
    height="240"
    controls
    on:loadedmetadata={logVideoLoaded}
    on:resize={logResizedVideo}
  >
    <track kind="captions" />
  </video>
</div>
<!-- 
  <div class="flex justify-center gap-2 m-2">
  <textarea
    id="dataChannelSend"
    class="bg-amber-200"
    disabled
    placeholder="Press Start, enter some text, then press Send."
  />
  <textarea id="dataChannelReceive" class="bg-teal-200" disabled />
</div> -->
