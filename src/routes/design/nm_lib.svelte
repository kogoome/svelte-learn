<script>
</script>

<div class="flex flex-col justify-center">
  <div class="flex justify-center p-3 bg-slate-300">
    <div class="nm-flat-slate-300-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-slate-300-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-slate-300-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-slate-300-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-amber-400">
    <div class="nm-flat-amber-400-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-amber-400-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-amber-400-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-amber-400-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-red-300">
    <div class="nm-flat-red-300-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-red-300-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-red-300-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-red-300-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-lime-400">
    <div class="nm-flat-lime-400-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-lime-400-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-lime-400-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-lime-400-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-purple-400">
    <div class="nm-flat-purple-400-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-purple-400-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-purple-400-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-purple-400-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-sky-400">
    <div class="nm-flat-sky-400-sm rounded-md m-2 px-2">nm-flat</div>
    <div class="nm-convex-sky-400-sm rounded-md m-2 px-2">nm-convex</div>
    <div class="nm-inset-sky-400-sm rounded-md m-2 px-2">nm-inset</div>
    <div class="nm-concave-sky-400-sm rounded-md m-2 px-2">nm-concave</div>
  </div>
  <div class="flex justify-center p-3 bg-slate-700">
    <div class="nm-flat-slate-700-sm rounded-md m-2 text-slate-400 px-2">nm-flat</div>
    <div class="nm-convex-slate-700-sm rounded-md m-2 text-slate-400 px-2">nm-convex</div>
    <div class="nm-inset-slate-700-sm rounded-md m-2 text-slate-400 px-2">nm-inset</div>
    <div class="nm-concave-slate-700-sm rounded-md m-2 text-slate-400 px-2">nm-concave</div>
  </div>

  <div class="flex justify-center p-3 bg-indigo-300">
    <button
      class="rounded-md m-2 px-2 transition-all duration-500
      nm-flat-indigo-300-sm
      hover:nm-convex-indigo-300-sm active:nm-inset-indigo-300-sm"
    >
      nm button
    </button>
    <button
      class="rounded-md m-2 px-2 transition-all duration-500
      active:nm-convex-indigo-300-sm
      hover:nm-inset-indigo-300-lg"
    >
      nm button nm button <br />
      nm button nm button <br />
      nm button
    </button>
    <button
      class="rounded-md m-2 px-2 transition-all duration-500 hover:bg-gradient-to-r hover:from-white hover:to-slate-200"
      >그라데이션 트랜지션 테스트</button
    >
  </div>
  트랜지션이 호버만 적용됨. 그라데이션은 트랜지션 대상이 아닌가봄.
  <div class="bg-amber-300 flex justify-center">
    <div
      class="nm-flat-amber-300-sm rounded-xl m-5 py-3 hover:nm-flat-amber-300-lg transition-all duration-500"
    >
      <div
        class="rounded-lg p-3 mb-3 mx-3 nm-inset-amber-400-sm hover:nm-inset-amber-400-lg transition-all duration-500"
      >
        <div class="flex gap-3">hover</div>
        <div>
          nm
          <span class="text-rose-500"> inset </span>
        </div>
      </div>
      <div class="bg-white px-3">
        nm
        <span class="text-pink-500"> flat </span>
      </div>
    </div>
    <div
      class="nm-convex-amber-300-sm rounded-xl m-5 py-3 
    hover:nm-convex-amber-300-lg transition-all duration-500"
    >
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> convex </span>
      </div>
      <div class="nm-inset-amber-400-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> inset </span>
        </div>
      </div>
    </div>
    <div class="nm-concave-amber-300-lg rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> concave </span>
      </div>
      <div class="nm-convex-amber-400-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> convex </span>
        </div>
      </div>
    </div>
    <div class="nm-concave-amber-300-lg rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> concave </span>
      </div>
      <div class="nm-flat-amber-400-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> flat </span>
        </div>
      </div>
    </div>
    <div class="nm-inset-amber-300-lg rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> inset </span>
      </div>
      <div class="nm-concave-amber-400-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> concave </span>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-rose-200 flex justify-center">
    <div
      class="nm-flat-rose-200-sm rounded-xl m-5 py-3 hover:nm-flat-rose-200-lg transition-all duration-500"
    >
      <div
        class="rounded-lg p-3 mb-3 mx-3 nm-inset-rose-300-sm hover:nm-inset-rose-300-lg transition-all duration-500"
      >
        <div class="flex gap-3">hover</div>
        <div>
          nm
          <span class="text-rose-500"> inset </span>
        </div>
      </div>
      <div class="bg-white px-3">
        nm
        <span class="text-pink-500"> flat </span>
      </div>
    </div>
    <div
      class="nm-convex-rose-200-sm rounded-xl m-5 py-3 
    hover:nm-convex-rose-200-lg transition-all duration-500"
    >
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> convex </span>
      </div>
      <div class="nm-inset-rose-300-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> inset </span>
        </div>
      </div>
    </div>
    <div class="nm-concave-rose-200-sm rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> concave </span>
      </div>
      <div class="nm-convex-rose-300-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> convex </span>
        </div>
      </div>
    </div>
    <div class="nm-concave-rose-200-sm rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> concave </span>
      </div>
      <div class="nm-flat-rose-300-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> flat </span>
        </div>
      </div>
    </div>
    <div class="nm-inset-rose-200-sm rounded-xl m-5 py-3 ">
      <div class="bg-white pl-3">
        nm
        <span class="text-pink-500"> inset </span>
      </div>
      <div class="nm-concave-rose-300-sm rounded-lg p-3 mt-3 mx-3">
        <div class="flex gap-3">item1</div>
        <div>
          item2
          <span class="text-rose-500"> concave </span>
        </div>
      </div>
    </div>
  </div>
</div>
