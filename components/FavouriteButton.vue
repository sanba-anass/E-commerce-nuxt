<template>
	<button @click="updateIsFavourite" class="heart-button">
		<HeartIconFilled v-if="currentProduct?.isFavourite" />
		<HeartIcon2 v-else />
	</button>
</template>

<script setup lang="ts">
const products = useProductList();

interface Props {
	id: string;
}

const supabase = useSupabaseClient();

const { id } = defineProps<Props>();

const currentProduct = products.value.find((product) => product.id === id);

const updateIsFavourite = async () => {
	if (currentProduct) {
		currentProduct.isFavourite = !currentProduct.isFavourite;
	}

	await supabase
		.from("product")
		//@ts-ignore
		.update({
			isFavourite: currentProduct?.isFavourite,
		})
		.eq("id", id);
	await refreshNuxtData();
};
</script>

<style scoped>
.heart-button {
	position: absolute;
	top: 1rem;
	right: -2rem;
	background: 0;
	border: 0;
	transition: 0.4s;
	opacity: 0;
}
</style>
