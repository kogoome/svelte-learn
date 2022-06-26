<script lang="ts">
  import { io } from 'socket.io-client'
  const socket = io()
  let myVideo: HTMLVideoElement
  let mySound: HTMLAudioElement
  let myAudio
  let myDisplay
  $: if (myVideo) {
    getMedia()
  }

  async function getMedia() {
    try {
      getDisplay()
    } catch (e) {
      console.log(e)
    }
  }
  async function getDisplay() {
    myDisplay = await navigator.mediaDevices.getDisplayMedia({ video: true })
    myVideo.srcObject = myDisplay
  }
  async function getAudio() {
    myAudio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    mySound.srcObject = myAudio
  }
</script>

<div class="m-10">
  <div class="text-3xl">Wisoom</div>
  <video
    id="myVideo"
    bind:this={myVideo}
    autoplay
    playsinline
    width="400"
    height="400"
    controls
    class="bg-slate-50 rounded-lg"
  >
    your browser is not support webrtc
    <track kind="captions" />
  </video>
  <audio
    id="mySound"
    bind:this={mySound}
    autoplay
    playsinline
    width="400"
    controls
    class="bg-slate-50 rounded-lg"
  >
    your browser is not support webrtc
    <track kind="captions" />
  </audio>
</div>
