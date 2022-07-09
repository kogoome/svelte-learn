<script lang="ts">
  class Node2 {
    next: Node2 | null = null
    constructor(public val: string) {}
  }

  class SinglyLinkedList {
    private head: Node2 | null = null
    private tail: Node2 | null = null
    private length = 0

    push(str: string) {
      const newNode = new Node2(str)
      if (!this.tail) {
        this.head = newNode
        this.tail = this.head
      } else {
        this.tail.next = newNode
        this.tail = newNode
      }
      this.length++
      return this
    }
    pop() {
      if (!this.head) return
      this.length--
      if (this.head == this.tail) {
        const result = new Node2(this.head.val)
        this.head = null
        this.tail = null
        return result
      }
      let current: Node2 | null = this.head
      let newTail = current
      while (current.next) {
        newTail = current
        current = current.next
      }
      this.tail = newTail
      newTail.next = null
      return current
    }
    unshift(str: string) {
      const newHead = new Node2(str)
      newHead.next = this.head
      this.head = newHead
      this.length++
    }
    shift() {
      if (!this.head) return
      this.length--
      const result = this.head.val
      this.head = this.head.next
      if (this.length == 0) {
        this.head = null
        this.tail = null
      }
      return result
    }
    traversal() {
      let current = this.head
      let result = []
      while (current) {
        result.push(current.val)
        current = current.next
      }
      return result
    }
    get h() {
      return this.head
    }
    get l() {
      return this.length
    }
    get(i: number) {
      if (i < 0 || i >= this.length) return undefined
      let index = 0
      let currentNode = this.head
      while (currentNode) {
        if (i === index) return currentNode
        currentNode = currentNode.next
        index++
      }
    }
  }

  const link = new SinglyLinkedList()
  let str = ''
  let div: HTMLDivElement
  let pop: HTMLDivElement
  let shift: HTMLDivElement
  let get: string | undefined
  $: get

  function keyDown(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      e.preventDefault()
      enterPush()
    }
  }
  function regex(e: KeyboardEvent) {
    let regex = /^get[0-9]+$/
    if (regex.test(str)) {
      const node = link.get(Number(str.replace('get', '')))
      get = typeof node === 'undefined' ? '값이 없습니다' : node?.val
    }
  }
  function clickUnshift() {
    link.unshift(str)
    str = ''
    fromJson()
  }
  function enterPush() {
    link.push(str)
    str = ''
    fromJson()
  }
  function clickPop() {
    const result = link.pop()
    pop.innerHTML = result ? `pop value : ${result.val}` : 'pop value : null'
    fromJson()
  }
  function clickShift() {
    const result = link.shift()
    shift.innerHTML = result ? `shift value : ${result}` : 'shift value : null'
    fromJson()
  }

  function fromJson() {
    const arr = JSON.stringify(link.h).replaceAll(':{', ':#{').split('#')
    div.innerHTML = ''
    arr.forEach((line) => {
      div.innerHTML += `<div>${line}</div>`
    })
    div.innerHTML += `length : ${link.l}`

    focus()
  }

  function fromTraversal() {
    div.innerHTML = ''
    link.traversal().forEach((val) => {
      div.innerHTML += `<div>${val}</div>`
    })
  }
  function focus() {
    const input = document.getElementById('input')
    input?.focus()
  }
</script>

<div class="m-10 flex justify-center">
  <div>
    <div>SinglyLinkedList Push & Pop :</div>
    <input
      id="input"
      type="text"
      bind:value={str}
      on:keydown={keyDown}
      on:keyup={regex}
      class="input input-sm input-primary"
    />
    <button class="btn btn-primary btn-sm" on:click={clickUnshift}>unshift</button>
    <button class="btn btn-primary btn-sm" on:click={clickPop}>pop</button>
    <button class="btn btn-secondary btn-sm" on:click={clickShift}>shift</button>
    <div bind:this={div} class="text-amber-400 text-3xl" />
    <div bind:this={pop} class="text-emerald-400 text-3xl" />
    <div bind:this={shift} class="text-indigo-400 text-3xl" />
    {get}
  </div>
</div>
