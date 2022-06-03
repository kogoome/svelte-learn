<script>

  $: keyword=""
</script>

<style> 
  #searchid { border-width: 1px; } 
  #searchid+label { top:1px; }
</style>

<div class="contentRoot relative">
모달 테스트
  <div class="relative group mb-5 ml-5 mr-5 mt-5">
    <input id="searchid" bind:value={keyword} type="text" name="search" class="block h-8 px-5 w-1/5 rounded-2xl  border-gray-300 text-md text-gray-300 text-center bg-transparent appearance-none focus:outline-none focus:ring-0 z-100
    peer " placeholder=" " required />
    <label for="searchid" class="absolute px-2 duration-300 rounded-3xl transform -translate-y-7 scale-75 
    z-10 origin-[0]  text-gray-300 text-lg
    peer-focus:left-0 peer-placeholder-shown:scale-100 whitespace-nowrap peer-placeholder-shown:translate-y-0
    peer-focus:bg-secondary-focus peer-focus:scale-75 peer-focus:-translate-y-3" 
    on:click={()=>document.getElementById('searchid').focus()}>
      <div class="tooltip tooltip-accent tooltip-right to-violet-600 " data-tip="Ctrl+<Shift>+F">
        Search Nodes
      </div>
    </label>
  </div>
  {#if keyword!==""}
  <div class="modalbg w-full h-full absolute z-20 left-0 top-0 flex flex-row justify-center transition-all" on:click={()=>keyword=""}>
    <div class="bg-base-100 w-3/5 h-4/5 rounded-2xl py-5 m-auto flex flex-col" on:click={(e)=>e.stopPropagation()}>
      <input class="flex-none px-5 pb-2 text-2xl bg-base-100 focus:outline-none" bind:value={keyword}>
      <div class="grow overflow-y-auto px-5">
        <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
        <p class="py-4">
          You've been selected for a chance to get one year of subscription to use Wikipedia for free! 
        </p>
        <p class="py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis beatae eius nobis numquam nulla consequatur, reiciendis et commodi minus, architecto doloribus perferendis dignissimos eos? Commodi id officiis facilis ducimus placeat.
        </p>
      </div>
      <footer class="flex-none px-5 text-2xl">footer</footer>
    </div>
  </div>
  {/if}
  <!-- 이렇게 하면 다 되는데, 맨 위 인풋칸이 공백일때 포커스를 뺏기면 모달이 사라지게 된다. -->

  체크박스로 모달
  <label class="peer block h-8 px-5 w-1/5 rounded-2xl  border-gray-300 text-md text-gray-300 text-center bg-transparent appearance-none focus:outline-none focus:ring-0">
    <input type="checkbox">
  </label>
  <div class="peer-first:checked:bg-red-400 bg-white w-20 h-20">
  </div>

  first last even odd
  <ul>
    <li class="first:bg-red-300 last:bg-blue-300">a</li>
    <li class="first:bg-red-300 last:bg-blue-300 even:bg-base-300 odd:bg-base-100">a</li>
    <li class="first:bg-red-300 last:bg-blue-300 even:bg-base-300 odd:bg-base-100">a</li>
    <li class="first:bg-red-300 last:bg-blue-300 even:bg-base-300 odd:bg-base-100">a</li>
    <li class="first:bg-red-300 last:bg-blue-300 even:bg-base-300 odd:bg-base-100">a</li>

    <li class="first:bg-red-300 last:bg-blue-300">a</li>
  </ul>

  focus-within 내부요소가 포커싱되면 작동
  <div class="focus-within:bg-red-300"> 
    <input type="text" />
  </div>

  before 사용예
  <div class="text-2xl font-semibold italic text-center text-slate-900">
    When you look
    <span class="before:block before:absolute before:-inset-1 before:-skew-y-6 before:bg-pink-500 relative inline-block">
      <span class="relative text-white">annoyed</span>
    </span>
    all the time, people think that you're busy.
  </div>

  <p class="first-letter:uppercase w-1/2
    first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
    first-letter:mr-3 first-letter:float-left
  ">
    Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit nam asperiores dicta pariatur explicabo corrupti doloremque reiciendis. Nihil amet dicta, ab error quo quidem natus eveniet adipisci quibusdam ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit nam asperiores dicta pariatur explicabo corrupti doloremque reiciendis. Nihil amet dicta, ab error quo quidem natus eveniet adipisci quibusdam ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit nam asperiores dicta pariatur explicabo corrupti doloremque reiciendis. Nihil amet dicta, ab error quo quidem natus eveniet adipisci quibusdam ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit nam asperiores dicta pariatur explicabo corrupti doloremque reiciendis. Nihil amet dicta, ab error quo quidem natus eveniet adipisci quibusdam ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque suscipit nam asperiores dicta pariatur explicabo corrupti doloremque reiciendis. Nihil amet dicta, ab error quo quidem natus eveniet adipisci quibusdam ex.
  </p>


  <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5">
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>
    <div class="bg-red-300 h-64 w-64 border-2"></div>

  </div>
  asd

</div>
