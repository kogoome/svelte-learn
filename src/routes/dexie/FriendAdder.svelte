<script>
  import { db } from './db'

  export let defaultAge = 5

  let status = ''
  let friendName = '알파카'
  let friendAge = defaultAge

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.friends.add({
        name: friendName,
        age: friendAge
      })

      status = `Friend ${friendName} successfully added. Got id ${id}`

      // Reset form:
      friendName = ''
      friendAge = defaultAge
    } catch (error) {
      status = `Failed to add ${friendName}: ${error}`
    }
  }
</script>

<div class="bg-slate-200 rounded-lg m-3 py-5">
  <fieldset class="px-10 pt-4">
    <legend class="flex w-full justify-center"><h1>Add new friend</h1></legend>
    <label class="text-xl">
      Name:
      <input class="input input-bordered w-full" type="text" bind:value={friendName} />
    </label>
    <label class="text-xl">
      Age:
      <input class="input input-bordered w-full" type="number" bind:value={friendAge} />
    </label>
    <p class="text-green-500 flex justify-center h-5">{status}</p>
    <div class="flex justify-center">
      <button class="btn btn-warning  w-1/4 m-7" on:click={addFriend}>Add Friend</button>
    </div>
  </fieldset>
</div>
