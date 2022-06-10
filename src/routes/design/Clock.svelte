<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    const deg = 6
    const hr = document.querySelector('#hr') as HTMLDivElement
    const mn = document.querySelector('#mn') as HTMLDivElement
    const sc = document.querySelector('#sc') as HTMLDivElement

    setInterval(() => {
      let day = new Date()
      let hh = day.getHours()
      let mm = day.getMinutes()
      let ss = day.getSeconds()

      hr.style.transform = `rotateZ(${(hh / 12) * 360 + deg}deg)`
      mn.style.transform = `rotateZ(${(mm / 60) * 360 + deg}deg)`
      sc.style.transform = `rotateZ(${(ss / 60) * 360 + deg}deg)`
    }, 1000)
  })
</script>

<div
  class="container bg-gradient-to-r from-pink-300 to-violet-300 w-[400px] h-[400px] flex justify-center items-center rounded-2xl m-10 shadow-lg"
>
  <div
    class="clock w-[350px] h-[350px] flex justify-center items-center  bg-cover border-4 border-solid border-white rounded-full"
  >
    <div class="hour absolute w-[160px] h-[160px] ">
      <div
        class="hr w-[160px] h-[160px] 
        flex justify-center absolute rounded-full"
        id="hr"
      />
    </div>
    <div class="min absolute w-[190px] h-[190px]">
      <div
        class="mn w-[190px] h-[190px] 
        flex justify-center absolute rounded-full"
        id="mn"
      />
    </div>
    <div class="sec absolute w-[230px] h-[230px]">
      <div
        class="sc w-[230px] h-[230px] 
        flex justify-center absolute rounded-full"
        id="sc"
      />
    </div>
  </div>
</div>

<style>
  .clock {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 -10px 10px rgba(255, 255, 255, 0.1), inset 0 -10px 10px rgba(255, 255, 255, 0.1),
      0 10px 10px rgba(0, 0, 0, 0.1), inset 0 10px 10px rgba(0, 0, 0, 0.1);
  }
  .clock:before {
    content: ' ';
    position: absolute;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    z-index: 100;
  }
  .hr:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 80px;
    background: #ff105e;
    z-index: 10;
    border-radius: 6px 6px 0 0;
  }
  .mn:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 90px;
    background: #fff;
    z-index: 11;
    border-radius: 6px 6px 0 0;
  }
  .sc:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 150px;
    background: #fff;
    z-index: 12;
    border-radius: 6px 6px 0 0;
  }
  /* .sc:before,
  .mn:before,
  .hr:before {
    box-shadow: 0 -10px 15px rgba(255, 255, 255, 0.05), inset 0 -10px 15px rgba(255, 255, 255, 0.05),
      0 10px 15px rgba(0, 0, 0, 0.05), inset 0 10px 15px rgba(0, 0, 0, 0.05);
  } */
</style>
