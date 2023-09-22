<template>
	<div class="item">
		<NuxtImg loading="lazy" class="image" :src="ImageUrl" />
		<h4>{{ title }}</h4>
		<span>{{ `${amount} products` }}</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	ImageUrl: string;
	title: string;
	amount: number;
}
const { ImageUrl, title, amount } = defineProps<Props>();
</script>

<style scoped>
.item {
	cursor: pointer;
}
h4,
span {
	text-align: center;
	display: block;
}
h4 {
	text-transform: uppercase;
	font-size: 0.9rem;
}
span {
	color: rgb(182, 182, 182);
	font-size: 0.85rem;
}

.image {
	margin-bottom: 1rem;
	width: 10rem;
	transition: 0.3s;
}
.image:hover {
	opacity: 0.7;
}
</style>
