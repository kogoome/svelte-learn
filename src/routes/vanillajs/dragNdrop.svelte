<script>
  import { onMount } from "svelte";
  onMount(() => {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");

    draggables.forEach(draggable => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    containers.forEach(container => {
      container.addEventListener("dragover", e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX);
        const draggable = document.querySelector(".dragging");
        if (afterElement === undefined) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });
  });
  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        // console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }
</script>

<div class="text-3xl transition-all">
  <div class="container bg-slate-300 rounded-md w-fit text-center h-fit p-3 flex flex-row justify-center gap-3 m-1">
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🦊</button>
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🐸</button>
  </div>
  <div class="container bg-slate-300 rounded-md w-fit text-center h-fit p-3 flex flex-row justify-center gap-3 m-1">
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🐶</button>
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🐱</button>
  </div>
  <div class="container bg-slate-300 rounded-md w-fit text-center h-fit p-3 flex flex-row justify-center gap-3 m-1">
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🥞</button>
    <button class="draggable bg-slate-200 rounded-md h-16 w-16 cursor-move" draggable="true">🥣</button>
  </div>
</div>
