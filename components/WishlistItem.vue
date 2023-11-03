<template>
	<div class="item">
		<div class="product">
			<NuxtLink :to="`/shop/${title.split(' ').join('-')}?id=${productId}`"
				><NuxtImg class="img" :src="image"
			/></NuxtLink>

			<div class="product-text">
				<NuxtLink
					:to="`/shop/${title.split(' ').join('-')}?id=${productId}`"
					class="title"
					>{{ title }}</NuxtLink
				>
				<p class="sku">sku:{{ sku }}</p>
			</div>
		</div>
		<p class="price">${{ price.toFixed(2) }}</p>
		<div class="buttons">
			<button title="quick-view" class="quick-view">
				<EyeIcon />
			</button>
			<button
				:class="{ 'not-allowed': pending }"
				:disabled="pending"
				@click="deleteWishlistItem"
				class="delete"
			>
				<TrashIcon v-if="!pending" />
				<Spinner v-else />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	sku: string;
	price: number;
	image: string;
	id: number;
	productId: string;
}
const { image, title, sku, price, id, productId } = defineProps<Props>();
const supabase = useSupabaseClient();
const products = useProductList();
const pending = ref(false);
const currentProduct = products.value.find(
	(product) => product.id === productId
);
async function deleteWishlistItem() {
	pending.value = true;
	await supabase.from("wishlist").delete().eq("id", id);
	await refreshNuxtData();
	currentProduct.isFavourite = false;
	await supabase
		.from("product")
		//@ts-ignore
		.update({
			isFavourite: currentProduct?.isFavourite,
		})
		.eq("id", productId);
	await refreshNuxtData();
	pending.value = false;
}
</script>

<style scoped>
.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #eee;
	padding-bottom: 1.75rem;
	margin-bottom: 1.75rem;
}
.not-allowed{
	cursor: not-allowed;
	opacity: 0.5;
}
.product {
	width: 40%;
	text-align: start;
}
.buttons,
.price {
	width: 30%;
}
.price {
	font-weight: bold;
}
.img {
	width: 7rem;
}

.product {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	text-align: start;
}
.product .sku {
	font-size: 0.8rem;
	color: gray;
}
.product .title {
	font-weight: 700;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
	display: inline-block;
	text-decoration: none;

	cursor: pointer;
}
.product .title:hover {
	text-decoration: underline;
}
.buttons {
	display: flex;
	gap: 1rem;
	margin-left: auto;
	justify-content: flex-end;
}
button {
	font-size: 1rem;
	background: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border: 1px solid #eee;
}
</style>
