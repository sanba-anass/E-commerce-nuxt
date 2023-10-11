<template>
	<div class="inputs">
		<input type="number" v-model="minPrice" />
		<div class="line"></div>
		<input type="number" v-model="maxPrice" />
	</div>
</template>

<script setup lang="ts">
const products = useProductList();
const supabase = useSupabaseClient();
const minPrice = ref(0);
const maxPrice = ref(156);
watch([minPrice, maxPrice], async ([newMinPrice, newMaxPrice]) => {
	const prices = Array.from(
		{ length: newMaxPrice + newMinPrice },
		(_, k) => k
	).slice(minPrice.value, maxPrice.value + 1);

	const { data } = await supabase
		.from("product")
		.select("*")
		.in("price", prices)
		.order("price", { ascending: true });

	products.value = data as never[];
	console.log(products.value);
});

</script>

<style scoped>
.inputs {
	display: flex;
	gap: 0.75rem;
	width: 100%;
	align-items: center;
}
.inputs .line {
	width: 2rem;
	height: 1px;
	background-color: rgb(27, 27, 27);
}
.inputs input {
	width: 100%;
	display: block;
	padding: 0.75em;
	background: rgb(245, 245, 245);
	font-size: 0.9rem;
	border: 0;
}
</style>
