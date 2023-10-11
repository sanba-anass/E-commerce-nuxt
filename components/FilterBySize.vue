<template>
	<div class="items">
		<div class="item" v-for="size in sizes">
			<div class="input">
				<input :value="size" :id="size" v-model="_sizes" type="checkbox" />
				<label :for="size">{{ size }}</label>
			</div>
		</div>
	</div>
	
	<button @click="reset" class="reset-button">Reset</button>
</template>

<script setup lang="ts">
const _sizes = ref([]);

const products = useProductList();
const supabase = useSupabaseClient();
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "X"];
watch(_sizes, async (newSizes) => {
	if (newSizes.length === 0) {
		const { data: defaultProducts } = await supabase
			.from("product")
			.select("*")
			.range(0, 11);
		products.value = defaultProducts;
		return;
	}
	const { data: newProducts } = await supabase
		.from("product")
		.select("*")
		.in("size", newSizes);
	products.value = newProducts;
});
function reset() {
	_sizes.value = [];
	
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
