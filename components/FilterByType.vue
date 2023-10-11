<template>
	<div class="items">
		<div class="item" v-for="productType in productTypes">
			<div class="input">
				<input
					:value="productType"
					:id="productType"
					v-model="types"
					type="checkbox"
				/>
				<label :for="productType">{{ productType }}</label>
			</div>
			<div class="amount">{{ currentProductLength }}</div>
		</div>
	</div>
	<button @click="reset" class="reset-button">Reset</button>
</template>

<script setup lang="ts">
const types = ref([]);
const currentProductLength = ref();

const products = useProductList();
const supabase = useSupabaseClient();
const productTypes = ["Blouses", "Denim", "Jacket", "T-Shirt", "Trousers"];
watch(types, async (newTypes) => {
	if (newTypes.length === 0) {
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
		.in("product_type", newTypes);
	products.value = newProducts;
});
function reset() {
	types.value = [];
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
