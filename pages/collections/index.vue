<template>
	<div>
		<h1>Collections</h1>
		<section>
			<NuxtLink to="/collections/spring-summer-2023">
				<div class="collection1">
					<p>Collection</p>
					<h3>Spring Summer 2023</h3>
				</div>
			</NuxtLink>
			<NuxtLink to="/collections/fall-winter-2023">
				<div class="collection2">
					<p>Collection</p>
					<h3>Fall winter 2023</h3>
				</div>
			</NuxtLink>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ keepalive: false });
</script>

<style scoped>
a {
	text-decoration: none;
	display: block;
}
h1 {
	text-align: center;
	margin-block: 3rem;
	font-weight: 500;
	font-size: 1.75rem;
	letter-spacing: 1px;
}
section {
	display: flex;
	flex-direction: row-reverse;
	width: 80%;
	margin: 0 auto;
	gap: 2rem;
	max-width: 105rem;
}

.collection1 {
	background: linear-gradient(
			to top,
			rgba(4, 4, 4, 0.35),
			rgba(54, 54, 54, 0.1)
		),
		url("~/assets/images/collection1-img.webp");
	display: flex;
	align-items: center;
	justify-content: center;
	background-repeat: no-repeat;
	background-position: center center;
	cursor: pointer;
	flex-direction: column;
	color: white;
	position: relative;
	background-size: cover;
	text-align: center;

	height: 100%;
}

.collection2 {
	background-image: linear-gradient(
			to top,
			rgba(4, 4, 4, 0.35),
			rgba(54, 54, 54, 0.1)
		),
		url("~/assets/images/collection2-img.webp");
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-repeat: no-repeat;
	background-position: center center;
	cursor: pointer;
	color: white;
	background-size: cover;
	text-align: center;
	height: 100%;

}

p {
	font-size: 1.5rem;
	font-weight: 300;
	letter-spacing: 1.5px;
}
h3 {
	font-size: 2.5rem;
}
section > * {
	width: 50%;
	min-height: 1000px;
	padding: 1rem;
}
@media (max-width: 80.125em) {
	section {
		width: 95%;
	}
	section > * {
		width: 50%;
		min-height: 600px;
		background-position: center top !important;
	}
}
@media (max-width: 60em) {
	h3 {
		font-size: 2rem;
	}
	p {
		font-size: 1.25rem;
	}
}
@media (max-width: 50em) {
	section {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5rem;
	}
	section > * {
		width: 100%;
	}
}
</style>
