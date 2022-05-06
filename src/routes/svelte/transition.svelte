<script>
  import {fly, fade, slide, blur,scale,draw,crossfade} from 'svelte/transition'
  $: visible=false
	function typewriter(node, { speed = 1 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible checkbox
</label>

<button on:click={()=>visible=!visible} class="btn"> visible button</button>
{#if visible}
  <div in:typewriter out:slide > this is typing transition </div>
  <ul in:slide out:slide>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
    <li>aa</li>
  </ul>
  <div in:fly={{y:100, duration:2000}} out:slide>
    레이아웃
  </div>
	<p transition:slide>Fades in and out</p>
{/if}