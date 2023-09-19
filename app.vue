<template>
	<div>
		<NuxtLayout>
			<NavBar />
			<NuxtPage />
			<Footer />
		</NuxtLayout>
	</div>
</template>
<script setup>
onBeforeMount(() => {
	if (process.client && window) {
		window.history.scrollRestoration = "auto";
	}
});
</script>
<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: inherit;
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
