<script lang="ts">
  import { loading } from '$lib/loading'
</script>

{#if $loading}
  <div class="fixed h-screen w-screen flex justify-center items-center z-50">
    <div class="bg-purple-400 rounded-full h-20 w-20 " />
  </div>
{/if}
