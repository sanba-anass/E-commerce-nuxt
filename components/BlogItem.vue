<template>
	<div class="blog">
		<NuxtLink
			:to="{
				path: navUrl,
			}"
			class="img"
		>
			<NuxtImg loading="lazy" :src="imageUrl" />
		</NuxtLink>
		<div class="text">
			<h3>{{ title }}</h3>
			<p>{{ description }}</p>
		</div>
		<NuxtLink
			:to="{
				path: navUrl,
			}"
			>Read more</NuxtLink
		>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	imageUrl: string;
	description: string;
}
const { title, description, imageUrl } = defineProps<Props>();

const navUrl = `/blogs/${title.toLowerCase().split(" ").join("-")}`;
</script>

<style scoped>
a {
	text-decoration: underline;
	cursor: pointer;
	display: inline-block;
}
.blog {
	width: 100%;
}
.img {
	width: 100%;
	cursor: pointer;
	overflow: hidden;
}
.img img {
	width: 100%;
	object-fit: cover;
	height: 230px;
	transition: 5s transform;
}
@media (max-width: 50rem) {
	.img img {
		height: 350px;
	}
}
.img img:hover {
	transform: scale(1.5);
}

.text {
	margin-top: 1.5rem;
}
.text h3 {
	text-transform: uppercase;
	margin-bottom: 1.5rem;
	font-weight: 400;
	font-size: 1.12rem;
	letter-spacing: 1.5px;
	line-height: 1.7;
}
.text p {
	line-height: 1.8;
	color: rgb(95, 95, 95);
	margin-bottom: 1rem;
}
</style>
