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

## svelte

src > route > svelte

스벨트 기본기능들. 새로운 학습이 발견되면 작성

### bindElement

- 변수-element 바인딩 `bind:this={x}`
- 변수-<input> 바인딩 `<input bind:value={x}/>`
- 변수-<div> 바인딩 `<div contenteditable="false" bind:textContent={x}/>`
- 함수-event 바인딩 `<button on:click={fnName}>`

### key-transition

스벨트의 트렌지션은 화면에 없다가 튀어나올때 작동하는데,
키 블록을 이용하면 키값으로 등록된 변수의 값이 변할때마다
키블록의 코드가 재 리로드가 된다.

### like for in
스벨트의 {#each as} 블럭은 배열만 접근이 가능
객체를 사용하기 위해 js 내장 메서드인 Object.entries()를 사용한다.
