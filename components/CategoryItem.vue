<template>
	<div>
		<NuxtLink class="link">
			<NuxtImg loading="lazy" class="img" :src="imageUrl" />
		</NuxtLink>
		<NuxtLink class="link">
			{{ title }}
		</NuxtLink>
	</div>
</template>
<script setup lang="ts">
interface Props {
	title: string;
	imageUrl: string;
}
const { title, imageUrl } = defineProps<Props>();
</script>
<style scoped>
.link {
	text-decoration: underline;
	cursor: pointer;
	display: block;
	font-weight: 600;
	font-size: 0.9rem;
}

.img {
	margin-bottom: 1rem;
	width: 100%;
}
</style>
