<template>
	<div class="order-item">
		<NuxtLink :to="`/shop/${title.split(' ').join('-')}?id=${productId}`">
			<NuxtImg class="img" :src="image" />
		</NuxtLink>

		<div class="details">
			<NuxtLink
				:to="`/shop/${title.split(' ').join('-')}?id=${productId}`"
				class="title"
				>{{ title }}</NuxtLink
			>
			<p class="price">
				${{ price }} x
				<span class="quantity">{{ totalQuantity }}</span>
			</p>
			<p class="size">
				Size: <span>{{ size }}</span>
			</p>
			<p class="color">
				Color: <span>{{ color }}</span>
			</p>
		</div>
		<DeleteButton :id="id" />
	</div>
</template>

<script setup lang="ts">
interface Props {
	productId: string;
	title: string;
	price: number;
	image: string;
	totalQuantity: number;
	id: string;
	size: string;
	color: string;
}

const { title, price, image, productId, id, color, size } =
	defineProps<Props>();
</script>

<style scoped>
.order-item {
	display: flex;
	gap: 1.5rem;
	padding: 1.5rem;
	padding-bottom: 1.5rem;
}
.order-item:not(:last-child) {
	border-bottom: 1px solid #eee;
}

.order-item .img {
	width: 5rem;
	cursor: pointer;
}

.title {
	font-weight: bold;
	font-size: 0.9rem;
	cursor: pointer;
	display: inline-block;
	margin-bottom: 0.5rem;
	text-decoration: none;
}
@media (max-width: 26em) {
	.title {
		font-size: 0.8rem;
	}
}
.title:hover {
	text-decoration: underline;
}
.price {
	font-weight: bold;
	font-size: 0.85rem;
}
.quantity {
	font-weight: normal;
}
.icon {
	cursor: pointer;
}
button {
	align-self: center;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	border-radius: 50%;
	margin-left: auto;
	transition: 0.3s;
}
button:hover {
	background: rgb(218, 218, 218);
}

.size,
.color {
	font-size: 0.70rem;
	color: rgb(163, 163, 163);
	margin-top: 0.5rem;
	text-transform: uppercase;
}
</style>
