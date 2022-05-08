<svelte:head>
  <title>tailwindcss position</title>
</svelte:head>


<div class="relative bg-blue-100 w-56 h-32 rounded-xl p-3">
  relative : parent space
  <div class="absolute bottom-0 left-0 bg-blue-300 rounded-xl p-3"> 
    absolute : child space 
  </div>
</div>

<div class="bg-blue-100 w-56 h-32 rounded-xl p-3 flex gap-2">
  <div>title</div>
  <div class="flex flex-col">
    <input type="text" value="search" class="peer input input-xs"/>
    <div class="relative invisible peer-focus:visible">
      <div class="absolute left-0 bg-blue-300 w-full opacity-50">
        <button class="btn btn-xs btn-success w-full hover:btn-primary">content</button>
        <button class="btn btn-xs btn-success w-full hover:btn-primary">content</button>
        <button class="btn btn-xs btn-success w-full hover:btn-primary">content</button>
        <button class="btn btn-xs btn-success w-full hover:btn-primary">content</button>
        <button class="btn btn-xs btn-success w-full hover:btn-primary">content</button>
      </div>
    </div>
  </div>
</div>