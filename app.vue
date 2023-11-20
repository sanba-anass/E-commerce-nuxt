<template>
	<NuxtLayout>
		<NuxtLoadingIndicator color="#E6733E" />

		<NavBar />
		<CartDrawer />
		<Dialog />
		<ProductDrawer v-if="productId" :product="currentProduct2" />
		<div
			@click="
				closeCartDrawer();
				closeProductDrawer();
			"
			v-if="isDrawerOpen || _isDrawerOpen"
			class="overlay"
		></div>
		<NuxtPage />

		<Toast
			v-if="currentProduct"
			:title="currentProduct?.title"
			:image-url="currentProduct?.preview_images[0]"
			text="Go to wishlist"
			:duration="25"
		/>

		<Footer />
	</NuxtLayout>
</template>
<script setup lang="ts">
const { isDrawerOpen, closeCartDrawer } = useOpenCartDrawer();
const { toastId } = useToast(30);
const { productId } = useProductDrawer();
const products = useProductList();
const { isDrawerOpen: _isDrawerOpen, closeProductDrawer } = useProductDrawer();
const currentProduct = computed(() =>
	products.value.find((product) => product.id === toastId.value)
);

const currentProduct2 = computed(() =>
	products.value.find((product) => product.id === productId.value)
);
</script>
<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: inherit;
	font-display: swap !important;
}
html {
	scroll-behavior: smooth;
}

body {
	font-family: "Nunito Sans", sans-serif;
}

a {
	color: black;
}
a:visited {
	color: black;
}
form input {
	font-family: "Nunito Sans", sans-serif;
	font-size: 0.9rem;
}
button {
	cursor: pointer;
}
img {
	max-width: 100%;
	display: block;
}
ul {
	list-style: none;
}
.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.295);
	z-index: 999999;
}
input[type="checkbox"] {
	accent-color: black;
}

@keyframes reveal {
	0% {
		transform: translate(0, 50%);
		opacity: 0;
	}
	100% {
		transform: translate(0, 0);
		opacity: 1;
	}
}
@media (max-width: 470px) {
	.slider > * {
		display: block;
		margin: 0 auto;
	}
}
.loading-indicator {
	background-color: black;
}

</style>
