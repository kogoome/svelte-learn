<script>
  import { liveQuery } from 'dexie'
  import { db } from './db'

  // Query parameters:
  let minAge = 10
  let maxAge = 20

  $: friends = liveQuery(async () => {
    // Query Dexie's API
    const friends = await db.friends.where('age').between(minAge, maxAge).toArray()
    // Return result
    return friends
  })
</script>

<div class="flex items-end">
  <input
    type="number"
    class="input input-ghost input-sm w-20 text-3xl"
    bind:value={minAge}
    placeholder="please input min age"
  />
  <h3>~</h3>
  <input
    type="number"
    class="input input-ghost input-sm w-20 text-3xl"
    bind:value={maxAge}
    placeholder="please input max age"
  />
  <h3>age</h3>
</div>
<ul>
  {#if $friends}
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  {/if}
</ul>
