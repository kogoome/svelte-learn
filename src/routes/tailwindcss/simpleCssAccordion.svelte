<script>
	let accordionChecked = false
</script>

<div class="contentRoot flex flex-col justify-start">

	<h3>tailwind peer accordion</h3>
	
	<div>
		<input id="third" type="checkbox" class="hidden peer "> 
		<label for="third" class="peer-checked:bg-red-500"> title1</label>
		<ul class="max-h-0 overflow-hidden
			peer-checked:max-h-max 
			">
			<li class="pl-3">list1</li>
			<li class="pl-3">list2</li>
			<li class="pl-3">
				<input id="fourth" type="checkbox" class="hidden peer "> 
				<label for="fourth" class="peer-checked:bg-red-500"> title1</label>
				<ul class="max-h-0 overflow-hidden
					peer-checked:max-h-fit  
					">
					<li class="pl-3">list1</li>
					<li class="pl-3">list2</li>
					<li class="pl-3">list3</li>
					<li class="pl-3">list4</li>
				</ul>
			</li>
		</ul>
	</div>

	<h3>htmltag, accodion</h3>
	
	<details class="open:bg-base-200">
		<summary class="text-sm select-none">
			title
		</summary>
		<div class="">
			<p class="pl-2">list 1</p>
			<p class="pl-2">list 1</p>
			<p class="pl-2">list 1</p>
			<p class="pl-2">list 1</p>
			<p class="pl-2">
				<details class="open:bg-base-200">
					<summary class="text-sm select-none">
						title
					</summary>
					<div class="">
						<p class="pl-2">list 1</p>
						<p class="pl-2">list 1</p>
						<p class="pl-2">list 1</p>
						<p class="pl-2">list 1</p>
						<p class="pl-2">
						</p>
					</div>
				</details>
			</p>
		</div>
	</details>

</div>