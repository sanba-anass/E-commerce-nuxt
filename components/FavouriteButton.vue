<template>
	<button @click="updateIsFavourite" class="heart-button">
		<HeartIconFilled v-if="currentProduct?.isFavourite" />
		<HeartIcon2 v-else />
	</button>
</template>

<script setup lang="ts">

interface Props {
	id: string;
}


const { id } = defineProps<Props>();
const supabase = useSupabaseClient();
const products = useProductList();


const currentProduct = products.value.find((product) => product.id === id);

const updateIsFavourite = async () => {
	if (currentProduct) {
		currentProduct.isFavourite = !currentProduct.isFavourite;
		await supabase
			.from("product")
			//@ts-ignore
			.update({
				isFavourite: currentProduct?.isFavourite,
			})
			.eq("id", id);
		if (currentProduct.isFavourite) {
			await supabase.from("wishlist").insert({
				product_id:currentProduct.id,
				title: currentProduct.title,
				sku: currentProduct.sku,
				price: currentProduct.price,
				image: currentProduct.detail_images[0]
			});
			console.log(
				currentProduct.title,
				currentProduct.sku,
				currentProduct.detail_images[0],
				currentProduct.price,
				currentProduct.id
			);
		} else {
			await supabase.from("wishlist").delete().eq("product_id", currentProduct.id);
		}
		await refreshNuxtData();
	}
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
