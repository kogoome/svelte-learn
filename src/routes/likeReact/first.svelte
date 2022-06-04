<script lang="ts">
  let obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6
  }
  let template = {
    title: 'like react code',
    subtitle: 'view data'
  }
  function app(object: any, key: string[]) {
    return `
    <div class="bg-teal-100 mx-10 mt-10 py-3 rounded-lg">
      <h1 class="bg-white px-3 mb-3">${template.title}</h1>
      <div class="p-3 bg-teal-200 mx-3 rounded-lg">
        <div class="text-xl font-medium text-teal-600">${template.subtitle}</div>
        array.tostring() : ${key.toString()}
        <div>
          array.map : 
          ${Array(key.length)
            .fill(0)
            .map((v, i) => {
              return `
              <div>
              ${object[key[i]]}
              </div>
              `
            })
            .join('')
            .toString()}
        </div>
        <div>
          dataReplace :
          {{__data__}}
        </div>
        svelte binding not available
      </div>
    </div>
    `.replace(/\{\{__data__\}\}/g, object.a)
  }
</script>

{@html app(obj, Object.keys(obj))}

<div class="mx-10">
  change obj.a data :
  <input type="number" bind:value={obj.a} class="input input-ghost input-sm bg-cyan-300" />
</div>
