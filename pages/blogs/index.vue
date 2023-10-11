<template>
	<h1>Top Articles</h1>
	<div class="blogs">
		<BlogItem
			v-for="(item, index) in blogItems"
			:imageUrl="`images/blog${index + 1}-img.webp`"
			:key="item.title"
			:title="item.title"
            :description="item.description"
		/>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ keepalive: false });
const blogItems = [
	{
		title: "THE CREATIVES: MÓNICA SORDO",

		description:
			"Venezuelan jewellery designer Mónica Sordo started her career in fashion in Europe, before returning home and embarking on a new journey that began...",
	},
	{
		title: "THE Down dress VOICE: ELISA SEDNAOUI",
		description:
			"Egyptian-Italian-French model and philanthropist Elisa Sednaoui talks to us about balancing work and motherhood and why she started children’s ed...",
	},
	{
		title: "ASK THE EDITOR: SARAH RASHEED",
		description:
			"Sarah Rasheed, Marie Claire Arabia's Senior Beauty Editor shows us how she styled our SS21 pieces for a weekend safari adventure.",
	},
	{
		title: "THE Down dress VOICE: CAROLINE LABOUCHERE",
		description:
			"Caroline Labouchere is an Ex-Army wife and a mother of two grown children. But at 53 years old her life took a turning point, starting a new career...",
	},
	{
		title: "THE BOUGUESSA VOICE: FARRAH STORR",
		description:
			"We speak to Farrah Storr, Editor-in-Chief of ELLE UK and author of The Discomfort Zone, about positivity during a pandemic and getting out of your ...",
	},
	{
		title: "A YOGA SESSION WITH ANOUD ALZABEN",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, practices different types of exercise during her day: energetic in the morning a...",
	},

	{
		title: "THE CREATIVES: ANA D'CASTRO",
		description: "Ana D’Castro is a Portuguese architect and visual artist. ",
	},
	{
		title: "THE CREATIVES: AUGUSTA QUAYNOR",
		description:
			"Augusta Quaynor is a British filmmaker who specialises in fashion and beauty films. After graduating from Bournemouth University, UK, with a bachel...",
	},
	{
		title: "A GREEN CORNER WITH ANOUD ALZABEN",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, explores her deep connection with nature through scenes of greenery in her home....",
	},
	{
		title: "THE CREATIVES: OLIVIA LEE",
		description:
			"We speak to Liv Lee, the artist behind our SS21 Lily Hawaiian print shirt, on her signature style and her dream summer vacation.",
	},
	{
		title: "A MESSAGE FROM OUR FOUNDER",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, explores her deep connection with nature through scenes of greenery in her home....",
	},
	{
		title: "BOUGUESSA’S GUIDE TO: HUDA KANJ’S GREEN KALE AND BROWN RICE SALAD",
		description:
			"Lebanese chef @HealthybyHuda shares a delicious salad recipe to up your greens game this year.",
	},
];
</script>

<style scoped>
h1 {
	text-align: center;
	margin-block: 3rem;
	font-weight: 500;
	font-size: 1.75rem;
}

.blogs {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	max-width: 105rem;
	margin: 0 auto;
	width: 90%;
	row-gap: 5rem;
	column-gap: 3.5rem;
}
@media (max-width: 50rem) {
	.blogs {
		display: flex;
		flex-direction: column;
	}
}
</style>
