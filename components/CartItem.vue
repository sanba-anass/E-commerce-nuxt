<template>
	<div class="cart-item">
		<div class="product">
			<DeleteButton :id="id" />
			<NuxtImg
				:to="`/shop/${title.split(' ').join('-')}?id=${productId}`"
				class="img"
				:src="image"
			/>
			<div class="caption">
				<NuxtLink
					:to="`/shop/${title.split(' ').join('-')}?id=${productId}`"
					class="title"
					>{{ title }}</NuxtLink
				>
				<p class="sku">SKU: {{ sku }}</p>
				<p class="size">SIZE: {{ size }}</p>
				<p class="color-name">COLOR: {{ colorName }}</p>
			</div>
		</div>
		<div class="details">
			<p class="price">${{ price.toFixed(2) }}</p>

			<QuantityConuter
				:id="id"
				class="counter"
				v-model:quantity="quantity"
				:isCartItem="true"
			/>

			<p class="total-price">${{ (quantity * price).toFixed(2) }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	title: string;
	price: number;
	image: string;
	totalQuantity: number;
	sku: string;
	size: string;
	colorName: string;
	productId: string;
}
const {
	productId,
	totalQuantity,
	title,
	price,
	image,
	sku,
	size,
	colorName,
	id,
} = defineProps<Props>();
const quantity = ref(totalQuantity);
</script>

<style scoped>

.cart-item {
	display: flex;
	border: 1px solid #eee;
	padding: 2rem;
	border-top: none;
	align-items: center;
	justify-content: space-between;
}

@media (max-width: 53.125em) {
	.cart-item {
		flex-direction: column;
		padding-inline: 1rem;
	}
}
.total-price {
	font-weight: 700;
}

.product {
	display: flex;
	align-items: center;
	width: 50%;
}
@media (max-width: 53.125em) {
	.product {
		width: 100%;
		margin-bottom: 1.5rem;
	}
}
.cart-item .img {
	width: 8rem;
	margin-left: 2rem;
	cursor: pointer;
}
@media (max-width: 25.0625rem) {
	.cart-item .img {
		width: 7rem;
		margin-left: 1rem;
		cursor: pointer;
	}
}
.caption {
	margin-left: 1.5rem;
}
.title {
	margin-bottom: 0.75rem;
	display: inline-block;
	font-size: 0.85rem;
	font-weight: 700;
	cursor: pointer;
	text-decoration: none;
}
.title:hover {
	text-decoration: underline;
}
.sku,
.size,
.color-name {
	color: rgb(179, 179, 179);
	font-weight: 500;
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
	text-transform: uppercase;
}

button {
	background: 0;
	border: 0;
}
.price {
	font-weight: 700;
}
.details {
	display: flex;
	align-items: center;
	width: 50%;
	justify-content: space-between;
}
@media (max-width: 53.125em) {
	.details {
		width: 100%;
	}
}
</style>
