<script>
	import { fade, slide } from 'svelte/transition';
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

{#if visible}
<p transition:slide>Fades in and out</p>
{/if}