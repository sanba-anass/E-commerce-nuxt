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
const minPrice = useCookie("minPrice", { default: () => 0 });
const maxPrice = useCookie("maxPrice", { default: () => 156 });



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
