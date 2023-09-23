<template>
	<div class="collection-main-img">
		<h1>SS23 COLLECTION</h1>
	</div>
	<div class="container">
		<section>
			<p>
				The SS23 collection evokes an optimistic spirit and gives you everything
				you need for a refined spring/summer wardrobe. Whilst staying true to
				our DNA of modern classics, the mood this season is one of vitality,
				with dopamine dressing firmly on the agenda.
			</p>
			<NuxtImg loading="lazy" src="images/collection2-inner-img1.webp" />
		</section>
		<section>
			<NuxtImg loading="lazy" src="images/collection2-inner-img2.webp" />
			<p>
				The SS23 collection evokes an optimistic spirit and gives you everything
				you need for a refined spring/summer wardrobe. Whilst staying true to
				our DNA of modern classics, the mood this season is one of vitality,
				with dopamine dressing firmly on the agenda.
			</p>
		</section>
		<p>
			There’s been a colour refresh, but with wearability in mind. Bold
			saturated shades are tempered by neutrals tones that provide a grounded
			sensibility. Expect a subtle colour palette of ecru, black and white
			juxtaposed with bursts of pink, green and yellow breaking free from
			conformity.
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
	max-width: 105rem;
	width: 90%;
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
		url("~/assets/images/collection2-main-img.webp");
	width: 100%;
	background-size: cover;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 2rem;
}
@media (max-width: 39.125em) {
	.collection-main-img {
		background-position: 5% 50%;
	}
}
@media (max-width: 31.125em) {
	.collection-main-img {
		background-position: 10% 50%;
	}
}
</style>
