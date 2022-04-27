<script>
  // 네비 메뉴 자동 가져오기(사이드바 만들때 많이 쓴다고 함)
  const pathArr = Object.keys(import.meta.glob("../routes/**"))
	const nav = pathArr
		.filter(path => path.includes(".svelte") && !path.includes("__"))
		.map(path => {
			const cleanPath = path.slice(9).replace(".svelte", "")
			const title =
				cleanPath.includes("/index") ?
					cleanPath.slice(1).replace("/index", "")
					: cleanPath.slice(1)
			const link =
				cleanPath.includes("/index") ?
					cleanPath == "/index" ?
						"/"
						: cleanPath.replace("/index", "")
					: cleanPath.replace("index", "")
			return { title, link }
		})
	import {page} from '$app/stores'

  let link 
  $: link=$page.url.pathname
</script>

<nav>
  <ul class="flex list-none justify-center gap-6">
    {#each nav as item}
      <li class="font-bold hover:text-[#52a7ec] transition-all duration-500">
        <a class:active={link === item.link} class="text-3xl" href={item.link}>{item.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .active {
    text-decoration: underline;
    color: #52a7ec;
		transition: all 1s;
  }
</style>