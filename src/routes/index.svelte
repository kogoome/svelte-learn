<script lang="ts">
  import { categories, categoryItems } from '../frontend/navItems'
  const colors = [
    'bg-red',
    'bg-rose',
    'bg-orange',
    'bg-yellow',
    'bg-amber',
    'bg-lime',
    'bg-green',
    'bg-sky',
    'bg-blue',
    'bg-indigo',
    'bg-teal',
    'bg-cyan',
    'bg-purple',
    'bg-pink',
    'bg-gray'
  ]
  const color200 = colors.map((c) => c + '-200')
  const color500 = colors.map((c) => c + '-500')
</script>

<div class="container py-3 m-10 rounded-xl text-center">
  <h1 class="bg-white px-3 ">FEATURE LINK INDEX</h1>
  <div class="grid grid-cols-2 grid-flow-row gap-1 text-white">
    {#each categories as category, index}
      <div class="{color500[index]} m-3 rounded-lg shadow-md">
        <h3 class="px-3">{category}</h3>
        <div class="{color500[index]} p-3 m-3 rounded-lg">
          {#each categoryItems[category] as item}
            <div>
              <a class="text-xl" href={item.link}>{item.title}</a>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
<svelte:head>
  <title>index page</title>
</svelte:head>

<style>
  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .container {
    background: linear-gradient(
      -85deg,
      #ff0000,
      #e73c7e,
      #ff8a66,
      #dfd24b,
      #ceff51,
      #8ffa61,
      #23d5ab,
      #2892e2,
      #3943fd,
      #391a87,
      #1c0d42,
      #f399ff
    );
    background-size: 400% 400%;
    animation: AnimationName 30s ease infinite;
  }
  .title {
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
</style>
