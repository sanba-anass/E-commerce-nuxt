<template>
	<div class="collection-main-img">
		<h1>FALL WINTER 2023</h1>
	</div>
	<div class="container">
		<section>
			<p>
				The essence of the Bouguessa FW23 collection is a mesmerizing journey
				back to the dynamic era of the early 90s, meticulously woven with
				contemporary craftsmanship and intricate detailing. This collection
				reimagines volumes and sharp lines, bestowing you with an array of
				versatile choices that seamlessly integrate into the tapestry of our
				daily lives.
			</p>
			<NuxtImg loading="lazy" src="images/collection1-inner-img1.webp" />
		</section>
		<section>
			<NuxtImg loading="lazy" src="images/collection1-inner-img2.webp" />
			<NuxtImg loading="lazy" src="images/collection1-inner-img3.webp" />
		</section>
		<p>
			Within this collection, an organic balance is struck between the art of
			tailoring, the fluidity of soft drapes, and the precision of sharp
			lines—an exquisite fusion that defines the season's distinctive character.
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
	max-width: 105rem;
	width: 100%;
	margin: 0 auto;
}
section {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	margin-bottom: 2rem;
	width: 100%;
}

section p {
	line-height: 1.8;
}
.container p:last-child {
	text-align: center;
	width: 90%;
	margin: 6rem auto;
}
section > * {
	width: 45%;
}
@media (max-width: 48.125em) {
	section {
		flex-direction: column;
		padding-inline: 1rem;
	}
	section > * {
		width: 100%;
	}
}
h1 {
	font-size: 1.765rem;
	font-weight: 400;
	color: white;
}
.collection-main-img {
	background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.459) 50%,
			rgba(204, 49, 49, 0)
		),
		url("~/assets/images/collection1-main-img.webp");
	width: 100%;
	background-size: cover;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
}
@media (max-width: 61.25em) {
	.collection-main-img {
		background-position: 30% 50%;
	}
}
</style>
