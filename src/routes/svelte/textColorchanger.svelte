<script lang="ts">
  let title = '빨강'

  type colors = {
    [key: string]: string
  }
  let colors: colors = {
    빨강: '#ff0000',
    주황: '#ffa500',
    노랑: '#ffff00',
    초록: '#008000',
    파랑: '#0000ff',
    남색: '#4b0082',
    보라: '#663399',
    하양: '#ffffff'
  }

  $: textColor = colors[title]
</script>

<div class="flex">
  <div class="text-3xl" style="color: {textColor};">입력한 문자</div>
  <div contenteditable="true" bind:textContent={title} />
</div>

div 태그나 span 태그 옆에 색상 선택하는 기능은 어떤가
