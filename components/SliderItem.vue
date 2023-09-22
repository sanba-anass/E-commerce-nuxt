<template>
	<div class="slider-item">
		<div @mouseleave="switchImage = false" @mouseenter="switchImage = true">
			<div class="images">
				<NuxtImg loading="lazy" :format="'webp'" :src="!switchImage ? url1 : url2" />
				<div class="arrows">
					<button @click="switchSliderItemImage" class="left-arrow">
						<LeftArrow />
					</button>
					<button @click="switchSliderItemImage" class="right-arrow">
						<RightArrow />
					</button>
				</div>
				<button class="shop-button">Quick Shop</button>
				<button @click="isFavourite = !isFavourite" class="heart-button">
					<HeartIconFilled v-if="isFavourite" />
					<HeartIcon2 v-else />
				</button>
			</div>
		</div>
		<div class="slider-item-content">
			<h4 class="title">{{ title }}</h4>
			<div class="rating-starts">
				<StartIcon v-for="_ in 5" />
			</div>
			<div class="prices">
				<div class="price old">
					{{ oldPrice ? "$" : "" }} {{ oldPrice?.toFixed(2) }}
				</div>
				<div class="price">${{ price.toFixed(2) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const switchImage = ref(false);
const isFavourite = ref(false);

function switchSliderItemImage() {
	switchImage.value = !switchImage.value;
}
interface Props {
	url1: string;
	url2: string;
	title: string;
	price: number;
	oldPrice: number | null;
}
const { url1, url2, title, price, oldPrice } = defineProps<Props>();
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.slider-item-content img {
	margin-bottom: 1rem;
	display: block;
}

.slider .slider-item {
	width: 100%;
	overflow: hidden;
}
@media (max-width: 470px) {
	.slider .slider-item {
		width: 270px;
	}
}

.slider-item-content .prices {
	display: flex;
	gap: 0.5rem;
	font-weight: 400;
	font-size: 0.85rem;
}
.slider-item-content .title {
	margin-bottom: 0.5rem;
	margin-top: 2rem;
}
.slider-item-content .prices .price {
	color: #c0883e;
}
.slider-item-content .prices .price.old {
	text-decoration: line-through;
	color: rgb(161, 161, 161);
}

.shop-button {
	background: rgba(255, 255, 255, 0.897);
	border: 0;
	width: 80%;
	text-transform: uppercase;
	position: absolute;
	width: 80%;
	bottom: 2rem;
	left: 1rem;
	right: 1rem;
	padding: 0.75rem 0;
	margin: 0 auto;
	opacity: 0;
	bottom: 0rem;
	transition: 0.3s;
}
.slider .slider-item .images {
	position: relative;
	margin-bottom: 1rem;
}
.slider .slider-item .arrows {
	justify-content: space-between;
	position: absolute;
	width: 100%;
	top: 50%;
	transform: translateY(-50%);
	padding: 1rem;
	cursor: pointer;
	display: flex;
}
.slider .slider-item .arrows .left-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(-1rem);
	background: 0;
	border: 0;
}
.slider .slider-item .images:hover:hover .left-arrow {
	opacity: 1;
	transform: translateX(0);
}
.slider .slider-item .arrows .right-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(1rem);
	background: 0;
	border: 0;
}
.slider .slider-item .images:hover .right-arrow {
	opacity: 1;
	transform: translateX(0);
}

.slider .slider-item .images:hover .shop-button {
	opacity: 1;
	bottom: 1.25rem;
}
.heart-button {
	position: absolute;
	top: 1rem;
	right: -2rem;
	background: 0;
	border: 0;
	transition: 0.4s;
	opacity: 0;
}
.slider .slider-item .images:hover .heart-button {
	right: 1rem;
	opacity: 1;
}
.slider img {
	width: 100%;
	display: block;
	cursor: pointer;
}
</style>
