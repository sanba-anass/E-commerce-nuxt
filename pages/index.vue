<template>
	<div class="container">
		<div class="hero-img">
			<div class="hero-text-holder">
				<h1>
					<span class="title">
						New <span class="summer-word">Summer</span> Feels Collection</span
					>
				</h1>
				<NuxtLink class="fancy">
					<span class="top-key"></span>
					<span class="text">Discover Now</span>
					<span class="bottom-key-1"></span>
					<span class="bottom-key-2"></span>
				</NuxtLink>
			</div>
		</div>
		<div class="container-2">
			<div class="tabs-section">
				<h2>Popular Products</h2>
				<div class="tabs-buttons">
					<button
						:class="{ 'isActive-tab': tab.isActive }"
						v-for="(tab, index) in tabs"
						@click="handleTabs(index)"
						class="tab-button"
					>
						{{ tab.text }}
					</button>
				</div>
			</div>
			<div class="divider"></div>
			<select v-model="selected">
				<option>Featured</option>
				<option>Best Selle</option>
				<option>New Arrival</option>
			</select>
			<ul class="slider">
				<ProductItem
					v-for="product in _products"
					:url1="product.preview_images[0]"
					:url2="product.preview_images[1]"
					:title="product.title"
					:price="product.price"
					:old-price="null"
					:id="product.id"
					:key="product.id"
					:rating="product.rating"
				/>
			</ul>
			<h2>Shop By Category</h2>
			<div class="divider"></div>
			<ul class="shop-category-items">
				<li v-for="item in categoryItems">
					<CategoryItem :title="item.title" :image-url="item.imageUrl" />
				</li>
			</ul>
			<section class="beyond-work">
				<div class="text">
					<h2>work & beyond</h2>
					<h3>For the commute to cocktail hour.</h3>
				</div>
				<div class="section-images">
					<div class="section-img">
						<NuxtImg loading="lazy" src="/images/showcase1-img.webp" />
					</div>

					<div class="section-img">
						<NuxtImg loading="lazy" src="/images/showcase2-img.webp" />
					</div>
				</div>
			</section>
			<section>
				<div class="text">
					<h2>Next-Level Layers</h2>
					<h3>Perfect outfit toppers to tie your look together.</h3>
				</div>
				<div class="section-images">
					<div class="section-img">
						<NuxtImg loading="lazy" src="/images/showcase3-img.webp" />
					</div>

					<div class="section-img">
						<NuxtImg loading="lazy" src="/images/showcase4-img.webp" />
					</div>
				</div>
			</section>
			<section class="beyond-work">
				<div class="text">
					<h2>Color confidence</h2>
					<h3>Fresh shades to liven up your wardrobe.</h3>
				</div>
				<div class="section-images">
					<div class="section-img">
						<video loop autoplay muted src="/images/showcase5-img.webm" />
					</div>

					<div class="section-img">
						<NuxtImg loading="lazy" src="/images/showcase6-img.webp" />
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
const selected = ref("Featured");
const supabase = useSupabaseClient();
const _products = useProductList();
const route = useRoute();

watch(
	() => route.fullPath,
	() => {
		_products.value = products.value?.data;
	}
);

const tabs = ref([
	{ text: "Featured", isActive: true },
	{ text: "Best Selle", isActive: false },
	{ text: "New Arrivals", isActive: false },
]);
const isActive = ref(true);
const handleTabs = (index: number) => {
	tabs.value[index].isActive = true;
	isActive.value = false;
	selected.value = tabs.value[index].text;

	tabs.value.forEach((_, i) => {
		if (i !== index) {
			tabs.value[i].isActive = false;
		}
	});
	// switch (index) {
	// 	case 0:
	// 		sliderImages.value = sliderImages1;
	// 		break;
	// 	case 1:
	// 		sliderImages.value = sliderImages2;
	// 		break;
	// 	case 2:
	// 		sliderImages.value = sliderImages3;
	// }
};
const categoryItems = [
	{
		title: "Shop Sweaters",
		imageUrl: "images/category1-img.jpeg",
	},
	{
		title: "Shop Sweaters",
		imageUrl: "images/category2-img.webp",
	},
	{
		title: "Shop Tops",
		imageUrl: "images/category3-img.webp",
	},
	{
		title: "Shop Jeans",
		imageUrl: "images/category4-img.jpeg",
	},
	{
		title: "Shop Jackets",
		imageUrl: "images/category5-img.webp",
	},
	{
		title: "Shop Shoes",
		imageUrl: "images/category6-img.webp",
	},
];
watch(
	selected,
	async (newValue) => {
		console.log(newValue);
		switch (newValue) {
			case "Featured":
				const { data: featuredProducts } = await useAsyncData(async () => {
					return await supabase
						.from("product")
						.select("*")
						.eq("category", "Featured Products")
						.limit(4);
				});
				_products.value = featuredProducts.value?.data;
				break;
			case "Best Selle":
				const { data: bestSellingProducts } = await useAsyncData(async () => {
					return await supabase
						.from("product")
						.select("*")
						.eq("category", "Best Sellers")
						.limit(4);
				});

				_products.value = bestSellingProducts.value?.data;

				break;
			case "New Arrivals":
				const { data: newArrivalsProducts } = await useAsyncData(async () => {
					return await supabase
						.from("product")
						.select("*")
						.eq("category", "New Arrivals")
						.limit(4);
				});
				_products.value = newArrivalsProducts.value?.data;
		}
		await refreshNuxtData();
	},
	{ immediate: true }
);
</script>
<style scoped>
.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.295);
	z-index: 1;
}
section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 11rem;
	gap: 4rem;
}

.beyond-work {
	flex-direction: row-reverse;
}
.beyond-work .text h3,
.beyond-work .text h2 {
	text-align: end;
}

section .section-images {
	display: flex;
	flex-direction: row-reverse;
	gap: 2rem;
	width: 70%;
}

section .section-images .section-img img {
	width: 400px;
}
video {
	max-width: 100%;
	display: block;
}
section .section-images .section-img video {
	width: 400px;
}
section .text {
	flex-basis: 30%;
}
section .text h2 {
	font-size: 1.5em;
	width: 100%;
	margin-bottom: 2rem;
	text-transform: uppercase;
	font-weight: 400;
	font-family: "lato";
}
section .text h3 {
	font-size: 2.5rem;
	width: 100%;
}
@media (max-width: 63em) {
	section {
		flex-direction: column-reverse;
		margin-bottom: 6rem;
		gap: 1.5rem;
	}
	.beyond-work {
		flex-direction: column-reverse;
	}
	section .section-images {
		width: 100%;
	}
	section .text h3,
	section .text h2 {
		text-align: center;
		margin-bottom: 1rem;
	}
	.beyond-work .text h2,
	.beyond-work .text h3 {
		text-align: center;
	}
	section .text h2,
	.beyond-work .text h2 {
		margin-bottom: 0.5rem;
	}
	.beyond-work .text h3,
	section .text h3 {
		margin-bottom: 0;
	}
	section .section-images {
		gap: 1rem;
	}
}
@media (max-width: 40em) {
	section {
		gap: 1rem;
	}
	.beyond-work .text h2 {
		font-size: 1.25rem;
	}
	.beyond-work .text h3 {
		font-size: 2rem;
	}
	section .text h2 {
		font-size: 1.25rem;
	}
	section .text h3 {
		font-size: 2rem;
	}
}
@media (max-width: 28em) {
	section .text h3 {
		font-size: 1.5rem;
	}
	.beyond-work .text h3 {
		font-size: 1.5rem;
	}
	section .text h2 {
		font-size: 0.9rem;
	}
	.beyond-work .text h2 {
		font-size: 0.9rem;
	}
}

.shop-category-items {
	display: grid;
	gap: 1rem;
	margin-bottom: 5rem;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
/* @media (max-width: 54.9375em) {
	.shop-category-items {
		grid-template-columns: repeat(3, 1fr);
	}
	
} */
select {
	width: 100%;
	padding: 0.5rem 0;
	margin-bottom: 1.5rem;
	border-color: gainsboro;
	padding-inline: 1rem;
}
@media (min-width: 39em) {
	select {
		display: none;
	}
}
select:focus {
	outline: none;
}

.tabs-section {
	display: flex;
	margin-top: 10rem;
	align-items: center;
	justify-content: space-between;
}

.tabs-section .tabs-buttons {
	display: flex;
	gap: 2.5em;
}
@media (max-width: 39em) {
	.tabs-section .tabs-buttons {
		display: none;
	}
}

.tabs-section .tabs-buttons * {
	background: 0;
	border: 0;
	font-size: 1rem;
	color: rgb(185, 185, 185);
	transition: 0.4s;
}
.tabs-section .tabs-buttons *:hover {
	color: rgb(24, 24, 24);
}
.tabs-section .tabs-buttons .isActive-tab {
	color: rgb(24, 24, 24);
	font-weight: 500;
}
.container-2 {
	margin: 0 auto;
	max-width: 1250px;
	width: 90%;
}
@media (max-width: 40em) {
	.container-2 {
		width: 100%;
		padding-inline: 0.75rem;
	}
}

.divider {
	height: 1.5px;
	background-color: rgb(221, 221, 221);
	margin: 0 auto;
	margin-bottom: 2rem;
	width: 100%;
	position: relative;
}
.divider::before {
	content: "";
	position: absolute;
	width: 192px;
	height: 2px;
	background-color: #c0883e;
}
h2 {
	margin-block: 10rem 0.75rem;
	width: fit-content;
	margin-top: 0;
}

.slider {
	margin-bottom: 6rem;
	display: grid;
	gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* .slider-item {
	position: relative;
	transition: 0.3s;
}
.slider img {
	width: 265px;
	display: block;
	cursor: pointer;
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
} */
.slider .slider-item .arrows .left-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(-1rem);
}
.slider .slider-item:hover .left-arrow {
	opacity: 1;
	transform: translateX(0);
}
.slider .slider-item .arrows .right-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(1rem);
}
.slider .slider-item:hover .right-arrow {
	opacity: 1;
	transform: translateX(0);
}

.container {
	max-width: 105rem;
	margin: 0 auto;
}

.hero-img {
	background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.4),
			rgba(255, 255, 255, 0)
		),
		url("~/assets/images/hero-img.webp");
	width: 100%;
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	color: white;
	isolation: isolate;
	display: flex;
	align-items: center;
	justify-content: center;
	background-attachment: fixed;
}
@media (max-width: 30.125em) {
	.hero-img {
		background-position: 15% 90%;
	}
}
@media (max-width: 25.125em) {
	.hero-img {
		background-position: 20% 90%;
	}
}
@media (max-width: 21.8125em) {
	.hero-img {
		background-position: 23% 90%;
	}
}
.hero-text-holder {
	text-align: center;
	height: calc(100% - 66px);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.hero-text-holder h1 {
	font-size: 4rem;
	position: relative;
	font-weight: 300;
	width: 100%;
}
@media (min-width: 105em) {
	.hero-text-holder .title {
		font-size: 5.4rem;
		width: 100%;
	}
}
@media (max-width: 45.8125em) {
	.hero-text-holder h1 {
		font-size: 3rem;
	}
}
@media (max-width: 21.875em) {
	.hero-text-holder h1 {
		font-size: 2.5rem;
	}
}

@media (max-width: 37.5em) {
	h1::after {
		display: none;
	}
}
h1 .title {
	display: block;
	animation: reveal 1.5s cubic-bezier(0.8, 0, 0.175, 1) forwards;
	max-width: 37.5rem;
	margin: 0 auto;
	transform: translate(0, 50%);
	opacity: 0;
	position: relative;
}
.fancy {
	animation: reveal 1.5s cubic-bezier(0.8, 0, 0.175, 1) forwards;
	background-color: transparent;
	border: 2px solid #fff;
	border-radius: 0;
	box-sizing: border-box;
	color: #000;
	cursor: pointer;
	display: inline-block;
	float: right;
	font-weight: 700;
	letter-spacing: 0.05em;
	margin: 0;
	outline: none;
	overflow: visible;
	padding: 1.25em 2em;
	position: relative;
	text-align: center;
	text-decoration: none;
	text-transform: none;
	transition: all 0.3s ease-in-out;
	user-select: none;
	font-size: 13px;
	margin-top: 2rem;
}

.fancy::before {
	content: "";
	width: 1.5625rem;
	height: 2px;
	background: white;
	top: 50%;
	left: 1.5em;
	position: absolute;
	transform: translateY(-50%);
	transform-origin: center;
	transition: background 0.3s linear, width 0.3s linear;
}

.fancy .text {
	font-size: 1.125em;
	line-height: 1.33333em;
	padding-left: 2em;
	display: block;
	text-align: left;
	transition: all 0.3s ease-in-out;
	text-transform: uppercase;
	text-decoration: none;
	color: white;
}

.fancy .top-key {
	height: 2px;
	width: 1.5625rem;
	top: -2px;
	left: 0.625rem;
	position: absolute;
	background: #212121;
	transition: width 0.5s ease-out, left 0.3s ease-out;
}

.fancy .bottom-key-1 {
	height: 2px;
	width: 1.5625rem;
	right: 1.875rem;
	bottom: -2px;
	position: absolute;
	background: #212121;
	transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy .bottom-key-2 {
	height: 2px;
	width: 0.625rem;
	right: 0.625rem;
	bottom: -2px;
	position: absolute;
	background: #212121;
	transition: width 0.5s ease-out, right 0.3s ease-out;
}

.fancy:hover {
	color: white;
	background-color: rgba(255, 255, 255, 0.918);
}

.fancy:hover::before {
	width: 0.9375rem;
	background: black;
}

.fancy:hover .text {
	color: black;
	padding-left: 1.5em;
}

.fancy:hover .top-key {
	left: -2px;
	width: 0px;
}

.fancy:hover .bottom-key-1,
.fancy:hover .bottom-key-2 {
	right: 0;
	width: 0;
}
.summer-word {
	color: #e6733e;
	font-weight: 600;
}
@keyframes side-reveal {
	0% {
		width: 5%;
		opacity: 0;
	}
	100% {
		width: 90%;

		opacity: 1;
	}
}
</style>
