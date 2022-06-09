<script>
  import CompareStrings from './CompareStrings.svelte'
  let beforeString = '안녕하세요. 저는 이순신입니다.'
  let afterString = '안녕하세요. 저는 이순신이 아닌 김순신입니다.'
</script>

뷰 디자인
<div>

</div>



<CompareStrings {beforeString} {afterString} />
