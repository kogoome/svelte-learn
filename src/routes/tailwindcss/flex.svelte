<svelte:head>
  <title>tailwindcss flex</title>
</svelte:head>

1. flex-row 기본값
<div class="flex flex-row gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

2. flex-col
<div class="flex flex-col gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

3. basis-1/3 꽉 채우기
<div class="flex gap-1 p-2 bg-slate-100">
  <div class="basis-1/3 h-10 bg-blue-300"></div>
  <div class="basis-1/3 h-10 bg-red-300"></div>
  <div class="basis-1/3 h-10 bg-green-300"></div>
</div>

4. grow 늘리기
<div class="flex gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-yellow-300"></div>
  <div class="h-10 grow bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-1. justify-center 요소 가운데 정렬
<div class="flex justify-center gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-2. justify-start 요소 왼쪽 정렬
<div class="flex justify-start gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-3. justify-end 요소 오른쪽 정렬
<div class="flex justify-end gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-4. justify-between 요소 균등 분리
<div class="flex justify-between gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-5. justify-around 요소 균등 패딩
<div class="flex justify-around gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-6. justify-evenly 요소 균등 마진
<div class="flex justify-evenly gap-1 p-2 bg-slate-100">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

5-7. 응용
<div class="flex justify-between gap-1 p-2 bg-slate-100">
  <div class="flex gap-1 bg-slate-200">
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
  </div>
  <div class="flex gap-1">
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
  </div>
  <div class="flex gap-1">
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
  </div>
</div>