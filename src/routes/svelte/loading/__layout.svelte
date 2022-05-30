<script lang="ts">
  import { navigating } from '$app/stores'
  import { loading } from '$lib/loading'
  import Loading from '$lib/loading.svelte'

  $: $loading = !!$navigating
</script>

<slot />

<button class="btn btn-primary " on:click={() => ($loading = !$loading)}>Set Loading</button>

<Loading />
