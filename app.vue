<template>
	<NuxtLayout>
		<Teleport to="body">
			<CartDrawer />
			<div @click="closeCartDrawer" v-if="isOpen" class="overlay"></div>
		</Teleport>
		<NavBar />

		<NuxtPage />

		<Footer />
	</NuxtLayout>
</template>
<script setup>
const { isOpen, closeCartDrawer } = useOpenCartDrawer();
</script>
<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: inherit;
	font-display: swap !important;
}
html{
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
</style>
