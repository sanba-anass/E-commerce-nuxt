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
const user = useSupabaseUser();
const { open, toastId, isFavouriteItem } = useToast(30);
const { productId } = useProductDrawer();
const { openDialog } = useDialog();

const currentProduct = computed(() =>
	products.value.find((product) => product.id === id)
);

const updateIsFavourite = async () => {
	if (!user.value) {
		openDialog("info", "please login to be able to save your favourites");
		return;
	}
	if (currentProduct.value) {
		isFavouriteItem.value = true;
		toastId.value = currentProduct.value.id;
		productId.value = currentProduct.value.id;
		currentProduct.value.isFavourite = !currentProduct.value.isFavourite;

		await supabase
			.from("product")
			//@ts-ignore
			.update({
				isFavourite: currentProduct.value?.isFavourite,
				user_id: user.value.id,
			})
			.eq("id", id);
			
		if (currentProduct.value.isFavourite) {
			open();
			await supabase.from("wishlist").insert({
				product_id: currentProduct.value.id,
				title: currentProduct.value.title,
				sku: currentProduct.value.sku,
				price: currentProduct.value.price,
				image: currentProduct.value.detail_images[0],
			});
		} else {
			await supabase
				.from("wishlist")
				.delete()
				.eq("product_id", currentProduct.value.id);
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
