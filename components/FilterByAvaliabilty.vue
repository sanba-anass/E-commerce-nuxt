<template>
	<div class="items">
		<div class="item">
			<div class="input">
				<input v-model="inStock" type="checkbox" />
				<label>In stock</label>
			</div>
			<p class="amount">{{ allProducts?.length }}</p>
		</div>
		<div class="item">
			<div class="input">
				<input v-model="outOfStock" type="checkbox" />
				<label>Out of stock</label>
			</div>
			<p class="amount">{{ allProducts?.length - 31 }}</p>
		</div>
	</div>
	<button @click="reset" class="reset-button">Reset</button>
</template>

<script setup lang="ts">
const products = useProductList();
const supabase = useSupabaseClient();
const { data: allProducts } = await supabase.from("product").select("*");

const inStock = ref(false);
const outOfStock = ref(false);
watch([inStock, outOfStock], async ([newMinPrice, newMaxPrice]) => {
	if (inStock.value) {
		const { data } = await supabase.from("product").select("*").range(11, 24);
		products.value = data as never[];
		return;
	}
	if (outOfStock.value) {
		const { data } = await supabase.from("product").select("*").limit(4);
		products.value = data as never[];
	} else {
		const { data } = await supabase.from("product").select("*").range(0, 11);
		products.value = data as never[];
	}
});
function reset() {
	inStock.value = false;
	outOfStock.value = false;
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
