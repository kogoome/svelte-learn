<script>
  import { liveQuery } from 'dexie'
  import { db } from './db'

  // Query parameters:
  let name = ''

  // $: 사인에 선언된 변수는 observable이므로 값이 변하면 할당된 함수를 자동실행한다.
  // 단 이 변환은 잘못된 값을 입력할시 오류가 발생한다.
  $: friends = liveQuery(async () => {
    // Query Dexie's API
    const friends = await db.friends.where('name').startsWithAnyOf(name).toArray()
    // Return result
    return friends
  })
</script>

<div class="flex items-end pt-4">
  <input
    type="text"
    class="input input-ghost input-sm w-36 text-3xl"
    bind:value={name}
    placeholder="name"
  />
</div>
<ul>
  {#if $friends}
    {#each $friends as friend (friend.id)}
      <li>{friend.name}, {friend.age}</li>
    {/each}
  {/if}
</ul>
