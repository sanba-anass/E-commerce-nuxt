<template>
	<div class="container">
		<h1>About</h1>
		<section class="images">
			<NuxtImg loading="lazy" src="images/about-img1.webp" />
			<NuxtImg loading="lazy" src="images/about-img2.webp" />
		</section>
		<section class="paragraphs">
			<p>
				DRESS DOWN is a contemporary ready-to-wear label that aims to offer a
				minimalist wardrobe focused on clean cuts and impeccable details to
				strong sophisticated women.
			</p>
			<p>
				At the centre of Bouguessa is an ethos of minimalist sophistication and
				feminine elegance. Merging global trends and contemporary classics
				inspired by art, architecture and modern design, the signature
				silhouettes lie in highly modern cuts, bold lines, and geometric
				precision.
			</p>
			<p>
				DRESS DOWN was founded in Dubai by Faiza Bouguessa in 2014. From her
				studio in Dubai Design District, she designs 3 collections a year.
			</p>
			<p>
				Faiza’s first encounter with garment making took place during her early
				years while spending time with her grandmother who was a seamstress
				herself, and who taught her the basics of knitting and sewing. Her
				passion led her to take numerous internships in tailor shops while
				studying English literature in university. Through these internships she
				learned the basics of pattern making and developed an understanding for
				fabric characteristics.
			</p>
		</section>
		<section class="images">
			<NuxtImg src="images/about-img3.webp" />
			<NuxtImg src="images/about-img4.webp" />
		</section>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
p {
	text-align: center;
	line-height: 1.8;
	margin-bottom: 3.5rem;
}
.container {
	max-width: 105rem;
	width: 90%;
	margin: 0 auto;
}
.paragraphs {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 8rem;
}
.images {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	margin-bottom: 5rem;
}

.images > * {
	width: 50%;
}
@media (max-width: 45.3125em) {
	.images {
		flex-direction: column;
	}
	.images > * {
		width: 100%;
	}
	.paragraphs {
		width: 100%;
	}
}
h1 {
	text-align: center;
	margin-block: 4rem;
	font-weight: 500;
	font-size: 1.75rem;
}
</style>
