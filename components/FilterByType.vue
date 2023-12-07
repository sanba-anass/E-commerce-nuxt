<template>
	<div class="items">
		<div class="item" v-for="productType in productTypes">
			<div class="input">
				<input
					:value="productType"
					:id="productType"
					v-model="cookietypes"
					type="checkbox"
					@input="
						($event) => {
							addToFilterValues(productType, $event.currentTarget.checked);
						}
					"
				/>
				<label :for="productType">{{ productType }}</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const filterValues = useCookie("filterValues");
const cookietypes = useCookie("cookietypes", { default: () => [] });

const productTypes = [
	"Blouses",
	"Denim",
	"Jacket",
	"T-Shirt",
	"Trousers",
	"Dresses",
];
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

.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
}
.item label {
	margin-left: 0.75rem;
	font-size: 0.85rem;
}
.item .input {
	display: flex;
	align-items: center;
}
.item input {
	border: 1px solid rgba(189, 16, 16, 0.719);
	width: 0.9rem;
	height: 0.9rem;
}
.amount {
	font-size: 0.85rem;
}
</style>
