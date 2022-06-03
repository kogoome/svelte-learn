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
  <div class="h-10 grow bg-red-300">grow</div>
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

6. flex-wrap 자동 줄바꿈
<div class="flex flex-wrap gap-1 p-2 bg-slate-100 w-48">
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
  <div class="h-10 w-10 bg-blue-300"></div>
  <div class="h-10 w-10 bg-red-300"></div>
  <div class="h-10 w-10 bg-green-300"></div>
</div>

7. items-option 폰트 줄맞춤 기준
<div class="flex flex-wrap gap-5 p-2 bg-slate-100">
  <div class="flex items-start gap-1">
    items-start
    <div class="text-sm bg-blue-300">스몰</div>
    <div class="text-xl bg-red-300">엑스라지</div>
    <div class="text-3xl bg-green-300">3엑스라지</div>
  </div>
  <div class="flex items-end gap-1">
    items-end
    <div class="text-sm bg-blue-300">스몰</div>
    <div class="text-xl bg-red-300">엑스라지</div>
    <div class="text-3xl bg-green-300">3엑스라지</div>
  </div>
  <div class="flex items-center gap-1">
    items-center
    <div class="text-sm bg-blue-300">스몰</div>
    <div class="text-xl bg-red-300">엑스라지</div>
    <div class="text-3xl bg-green-300">3엑스라지</div>
  </div>
  <div class="flex items-baseline gap-1">
    items-baseline
    <div class="text-sm bg-blue-300">스몰</div>
    <div class="text-xl bg-red-300">엑스라지</div>
    <div class="text-3xl bg-green-300">3엑스라지</div>
  </div>
  <div class="flex items-stretch gap-1">
    items-stretch
    <div class="text-sm bg-blue-300">스몰</div>
    <div class="text-xl bg-red-300">엑스라지</div>
    <div class="text-3xl bg-green-300">3엑스라지</div>
  </div>
</div>

0. 응용
<div class="flex flex-wrap justify-between gap-1 p-2 bg-slate-100">
  <div class="flex gap-1 bg-slate-200">
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
  </div>
  <div class="grow flex justify-center gap-1 w-fit bg-slate-400">
    <div class="h-10 w-10 bg-blue-300"></div>
    <div class="h-10 w-10 bg-red-300"></div>
  </div>
  <div class="flex gap-1">
    <div class="h-10 w-10 bg-red-300"></div>
    <div class="h-10 w-10 bg-green-300"></div>
  </div>
</div>