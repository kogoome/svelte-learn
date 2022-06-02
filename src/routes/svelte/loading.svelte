<script>
  import {
    Circle,
    Circle2,
    Circle3,
    DoubleBounce,
    GoogleSpin,
    ScaleOut,
    SpinLine,
    Stretch,
    BarLoader,
    Jumper,
    RingLoader,
    SyncLoader,
    Rainbow,
    Wave,
    Firework,
    Pulse,
    Jellyfish,
    Chasing,
    Shadow,
    Square,
    Moon,
    Plane,
    Diamonds,
    Clock
  } from 'svelte-loading-spinners'
  let str = '{Loadings}'
  let color = '#ffffff'
</script>

<div class="bg-indigo-100 rounded-xl m-10 py-3 shadow-lg">
  <h2 class="bg-white px-3">
    import <span class="text-purple-600">{str}</span> <br />
    from <span class="text-indigo-600">'svelte-loading-spinners'</span>
  </h2>
  <div class="flex gap-5 p-10 bg-indigo-200 rounded-xl mx-3 mt-3 justify-around">
    Circle2
    <Circle2 size="60" unit="px" />
    Circle3
    <Circle3 size="60" unit="px" duration="2s" />
    GoogleSpin
    <GoogleSpin />
  </div>
  <div class="flex flex-col gap-5 p-10 bg-indigo-200 rounded-xl mx-3 mt-3">
    <div class="flex gap-10 justify-center">
      <Circle size="60" {color} unit="px" duration="2s" />
      <Circle2 size="60" unit="px" />
      <Circle3 size="60" unit="px" duration="2s" />
      <GoogleSpin />
      <DoubleBounce size="60" {color} unit="px" duration="2s" />
      <ScaleOut size="60" {color} unit="px" duration="2s" />
    </div>
    <div class="flex gap-10 justify-center">
      <SpinLine size="60" {color} unit="px" duration="2s" />
      <Stretch size="60" {color} unit="px" duration="2s" />
      <BarLoader size="60" {color} unit="px" duration="2s" />
      <Jumper size="60" {color} unit="px" duration="2s" />
      <RingLoader size="60" {color} unit="px" duration="2s" />
      <SyncLoader size="60" {color} unit="px" duration="2s" />
    </div>
    <div class="flex gap-10 justify-center">
      <Rainbow size="60" {color} unit="px" duration="2s" />
      <Wave size="60" {color} unit="px" duration="2s" />
      <Firework size="60" {color} unit="px" duration="2s" />
      <Pulse size="60" {color} unit="px" duration="2s" />
      <Jellyfish size="60" {color} unit="px" duration="2s" />
      <Chasing size="60" {color} unit="px" duration="2s" />
    </div>
    <div class="flex gap-10 justify-center">
      <Shadow size="60" {color} unit="px" duration="2s" />
      <Square size="60" {color} unit="px" duration="2s" />
      <Moon size="60" {color} unit="px" duration="2s" />
      <Plane size="60" {color} unit="px" duration="2s" />
      <Diamonds size="60" {color} unit="px" duration="2s" />
      <Clock size="60" {color} unit="px" duration="2s" />
    </div>
  </div>
</div>
