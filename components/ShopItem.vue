<template>
	<div class="item">
		<NuxtImg loading="lazy" :src="imageUrl" />
		<NuxtLink class="product-name">{{ name }}</NuxtLink>
		<p class="price">${{ price }}</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	imageUrl: string;
	name: string;
	price: number;
}
const { imageUrl, name, price } = defineProps<Props>();
</script>

<style scoped>
.item img {
	margin-bottom: 1rem;
	cursor: pointer;
}
.product-name {
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	display: inline-block;
	cursor: pointer;
}
.product-name:hover {
	text-decoration: underline;
}
.price {
	font-size: 0.8rem;
	font-weight: 600;

}

</style>
