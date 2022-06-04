<script>
  import { liveQuery } from 'dexie'
  import { db } from './db'

  let friends = liveQuery(() => db.friends.toArray())
</script>

<h3>All</h3>
<ul>
  {#if $friends}
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  {/if}
</ul>
