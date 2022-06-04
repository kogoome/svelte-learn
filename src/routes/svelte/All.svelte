<script>
  import BindElement from './bindElement.svelte'
  import KeyTransition from './key-transition.svelte'
  import LikeForIn from './likeForIn.svelte'
  import Loading from './loading.svelte'
  import RadioBinding from './radioBinding.svelte'
  import Template from './template.svelte'
</script>

<div class="rootContainer">
  <Template />
  <BindElement />
  <KeyTransition />
  <LikeForIn />
  <Loading />
  <RadioBinding />
</div>

<style>
  .rootContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
</style>
