<script lang="ts">
	let todo: HTMLDivElement;

	function readKanban() {
		console.log(todo);
	}
	function clockSwitch(e: Event) {
		// 전역 변수 todo에 의존
		const button = <HTMLDivElement>e.target;
		const clock = <HTMLDivElement>todo.nextElementSibling;
		if (button.innerHTML === 'Todo') {
			todayWorkCopy();
			todo.style.display = 'none';
			clock.style.display = 'block';
		} else {
			clock.style.display = 'none';
			todo.style.display = 'block';
		}

		function todayWorkCopy() {
			// button.innerHTML === 'Todo' 일때만 호출함수 슬라이드시 주의
			todo.querySelector('#todayWork')!.innerHTML;
			clock;
		}
	}
</script>

<button on:click={readKanban}>readKanban</button>
<h1 class="text-center">TODO 업무 진행용 칸반 제작</h1>

<div class="flex rounded-xl bg-slate-200 p-3 m-3 justify-between gap-3">
	<div class="basis-1/3 w-full bg-slate-300 rounded-md pb-8" bind:this={todo}>
		<h1 class="text-center bg-white" on:click={clockSwitch}>Todo</h1>
		<div class="px-3" id="todayWork">
			<input id="todayWork" type="checkbox" class="hidden peer" checked />
			<label for="todayWork"><h1>todayWork</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<div class="flex">
					<input class="bg-white w-full rounded-md" />
					<button class="btn btn-ghost btn-sm">add</button>
				</div>
				<div contenteditable="true">1. make highquality education share platform</div>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
		<div class="px-3">
			<input id="0.0.z" type="checkbox" class="hidden peer" checked />
			<label for="0.0.z"><h1>0.0.z</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<li>1. make highquality education share platform</li>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
		<div class="px-3">
			<input id="0.y.0" type="checkbox" class="hidden peer" checked />
			<label for="0.y.0"><h1>0.y.0</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<li>1. make highquality education share platform</li>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
		<div class="px-3">
			<input id="x.0.0" type="checkbox" class="hidden peer" checked />
			<label for="x.0.0"><h1>x.0.0</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<li>1. make highquality education share platform</li>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
		<div class="px-3">
			<input id="philosophy" type="checkbox" class="hidden peer" checked />
			<label for="philosophy"><h1>philosophy</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<li>1. make highquality education share platform</li>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
	</div>
	<div class="basis-1/3 w-full bg-slate-300 rounded-md pb-8" style="display:none;">
		<h1 class="text-center bg-white" on:click={clockSwitch}>clock</h1>
		<div class="px-3">
			<input id="todayWork" type="checkbox" class="hidden peer" checked />
			<label for="todayWork"><h1>todayWork</h1></label>
			<ul
				class="h-0 -translate-y-3 opacity-0 overflow-hidden peer-checked:h-fit peer-checked:opacity-100 peer-checked:transform-none transition-all duration-300"
			>
				<div class="flex">
					<input class="bg-white w-full rounded-md" />
					<button class="btn btn-ghost btn-sm">add</button>
				</div>
				<div contenteditable="true">1. make highquality education share platform</div>
				<li>2. structured knowledge make knowledge relation freely</li>
				<li>3. education out of the world</li>
			</ul>
		</div>
	</div>
	<div class="basis-1/3 w-full bg-slate-400 rounded-md pb-8">
		<h1 class="text-center bg-white">Process</h1>
	</div>
	<div class="basis-1/3 w-full bg-slate-500 rounded-md pb-8">
		<h1 class="text-center bg-white">Complete</h1>
	</div>
</div>
