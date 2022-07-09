<script lang="ts">
  import { io } from 'socket.io-client'
  import { onMount } from 'svelte'
  import { muteIcon, microphoneIcon } from './assets/_index'

  let myFace: HTMLVideoElement
  let myStream: MediaStream

  let mediaStreamConstraints = { video: false, audio: true }
  let displayStreamConstraints = { video: true }
  let muted = false
  let cameraOn = false
  let displayon = false

  async function getDisplay() {
    try {
      myStream = await navigator.mediaDevices.getDisplayMedia(displayStreamConstraints)
      console.log(myStream)
      myFace.srcObject = myStream
    } catch (e) {
      console.log(e)
    }
  }
  async function getCam() {
    try {
      myStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
      console.log(myStream)
      myFace.srcObject = myStream
    } catch (e) {
      console.log(e)
    }
  }

  function handleMuteClick() {
    mediaStreamConstraints.audio = muted ? true : false
    muted = !muted
    getCam()
  }
  function handleCamClick() {
    mediaStreamConstraints.video = cameraOn ? true : false
    cameraOn = !cameraOn
    getCam()
  }
</script>

<svelte-head>
  <title>video</title>
</svelte-head>

<div class="flex">
  <main class="bg-amber-200 w-[90vw] h-screen">
    <video bind:this={myFace} autoplay playsinline width="400" height="400" class="w-full h-fit">
      <track kind="captions" />
    </video>

    <div>
      <button class="btn btn-ghost w-16 h-16" on:click={handleMuteClick}>
        <img src={muteIcon} alt="" />
      </button>
      <button class="btn btn-ghost w-16 h-16">
        <img src={microphoneIcon} alt="" />
      </button>
      <button class="btn btn-ghost w-16 h-16" on:click={handleCamClick}> cam </button>
      <button class="btn btn-ghost w-16 h-16" on:click={getDisplay}> display </button>
      <button class="btn btn-ghost w-16 h-16"> exit </button>
      <button class="btn btn-ghost w-16 h-16"> start </button>
    </div>
  </main>
  <sidecam class="bg-rose-200 w-[10vw] h-screen"> 사람들 모습 </sidecam>
</div>
