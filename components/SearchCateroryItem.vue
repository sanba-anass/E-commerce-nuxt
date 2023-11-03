<template>
	<NuxtLink @click="$emit('closeMenu')" :to="`/shop?page=1`" class="item">
		<div class="img">
			<NuxtImg loading="lazy" class="image" :src="ImageUrl" />
		</div>

		<h4>{{ title }}</h4>
		<span>{{ `${products?.count} products` }}</span>
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	ImageUrl: string;
	title: string;
}
const supabase = useSupabaseClient();
const { ImageUrl, title } = defineProps<Props>();
const emit = defineEmits(["closeMenu"]);

const { data: products } = await useAsyncData(
	title,
	async () =>
		await supabase
			.from("product")
			.select("*", { count: "exact" })
			.eq("brand", title)
);
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
	font-size: 0.85rem;
}
span {
	color: rgb(182, 182, 182);
	font-size: 0.85rem;
}

.image {
	margin-bottom: 1rem;
	transition: 0.3s;
	flex: 1;
	width: 100%;
	height: 220px;
	object-fit: cover;
	object-position: TOP;
}

.image:hover {
	opacity: 0.7;
}
</style>
