# 스벨트킷 프로젝트 생성

```
npm init svelte
all feature confirm
npm init
```

# 테일윈드 적용

```
npx svelte-add@latest tailwindcss
```

# 깃 연결

```
git init

git remote add origin https://github.com/kogoome/svelte-learn.git

git pull origin master

npm i
```

# 구현된 코드들

src > route > svelte

스벨트 기본기능들. 새로운 학습이 발견되면 작성

- 변수-element 바인딩 `bind:this={x}`
- 변수-<input> 바인딩  `<input bind:value={x}/>`
- 변수-<div> 바인딩 `<div contenteditable="false" bind:textContent={x}/>`
- 함수-event 바인딩 `<button on:click={fnName}>`
