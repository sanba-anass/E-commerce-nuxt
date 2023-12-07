<template>
	<div class="items">
		<div class="item" v-for="ava in productava">
			<div class="input">
				<input
					@input="
						($event) => {
							addToFilterValues(ava, $event.currentTarget.checked);
						}
					"
					:value="ava"
					:id="ava"
					v-model="productavaCookie"
					type="checkbox"
				/>
				<label :for="ava">{{ ava }}</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const productava = ["inStock", "outStock"];

const filterValues = useCookie("filterValues");
const productavaCookie = useCookie("productavaCookie", { default: () => [] });

function addToFilterValues(checkboxValue: string, checked: boolean) {
	if (!checked) {
		filterValues.value.splice(filterValues.value?.indexOf(checkboxValue), 1);
		console.log(filterValues.value);
		return;
	}
	filterValues.value?.push(checkboxValue);
	console.log(filterValues.value);
}
</script>

<style scoped>
.reset-button {
	padding: 0.15rem 0.75rem;
	margin-left: auto;
	display: block;
	border: 0;
	border-radius: 4px;
	transition: 0.3s;
	font-size: 0.9rem;
}
.reset-button:hover {
	background-color: black;
	color: white;
}
.items {
	margin-bottom: 2rem;
}
.amount {
	font-size: 0.85rem;
}

.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
}
.item label {
	margin-left: 0.5rem;
	font-size: 0.95rem;
}
.item .input {
	display: flex;
	align-items: center;
}
.item input {
	border: 1px solid rgba(189, 16, 16, 0.719);
	width: 0.95rem;
	height: 0.95rem;
}
</style>
