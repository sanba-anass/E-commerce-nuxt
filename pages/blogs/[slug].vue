<template>
	<div
		:style="{
			background: `url(/images/blog${blog + 1}-big-img.jpg)`,
		}"
		class="blog-background"
	></div>
	<div class="blog-wrapper">
		<section class="intro">
			<div class="date">
				{{ blogItems.at(blog).publishDate }}
			</div>
			<div class="title">
				{{ blogItems.at(blog).title }}
			</div>
			<div class="description">
				{{ blogItems.at(blog).description }}
			</div>
		</section>
		<section class="blog-content">
			<article>
				<NuxtImg
					loading="lazy"
					v-if="blogItems.at(blog).innerSections.section1?.img"
					:src="blogItems.at(blog).innerSections.section1?.img"
				/>
				<p>
					{{ blogItems.at(blog).innerSections.section1?.description || "" }}
				</p>
			</article>
			<article>
				<NuxtImg
					loading="lazy"
					v-if="blogItems.at(blog).innerSections.section2?.img"
					:src="blogItems.at(blog).innerSections.section2?.img"
				/>
				<p>
					{{ blogItems.at(blog).innerSections.section2?.description || "" }}
				</p>
			</article>
			<article>
				<NuxtImg
					loading="lazy"
					v-if="blogItems.at(blog).innerSections.section3?.img"
					:src="blogItems.at(blog).innerSections.section3?.img"
				/>
				<p>
					{{ blogItems.at(blog).innerSections.section3?.description || "" }}
				</p>
			</article>
		</section>
	</div>
</template>

<script setup>
definePageMeta({ keepalive: false });
const blogItems = [
	{
		title: "THE CREATIVES: MÓNICA SORDO",
		description:
			"Venezuelan jewellery designer Mónica Sordo started her career in fashion in Europe, before returning home and embarking on a new journey that began in her father’s industrial design workshop. Inspired by her mother’s creative sensibility, Monica began creating works of art that would stand the test of time, through design, heritage, people, craftsmanship and collaboration.",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog1-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog1-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog1-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "THE Down dress VOICE: ELISA SEDNAOUI",

		description:
			"Egyptian-Italian-French model and philanthropist Elisa Sednaoui talks to us about balancing work and motherhood and why she started children’s ed...",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog2-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog2-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog2-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},

	{
		title: "ASK THE EDITOR: SARAH RASHEED",
		description:
			"Sarah Rasheed, Marie Claire Arabia's Senior Beauty Editor shows us how she styled our SS21 pieces for a weekend safari adventure.",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog3-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog3-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog3-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "THE Down dress VOICE: CAROLINE LABOUCHERE",
		description:
			"Caroline Labouchere is an Ex-Army wife and a mother of two grown children. But at 53 years old her life took a turning point, starting a new career...",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog4-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog4-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog4-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "THE BOUGUESSA VOICE: FARRAH STORR",
		description:
			"We speak to Farrah Storr, Editor-in-Chief of ELLE UK and author of The Discomfort Zone, about positivity during a pandemic and getting out of your ...",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog5-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog5-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog5-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "A YOGA SESSION WITH ANOUD ALZABEN",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, practices different types of exercise during her day: energetic in the morning a...",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: null,
			section2: null,
			section3: null,
		},
	},

	{
		title: "THE CREATIVES: ANA D'CASTRO",
		description: "Ana D’Castro is a Portuguese architect and visual artist. ",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog7-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog7-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog7-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "THE CREATIVES: AUGUSTA QUAYNOR",
		description:
			"Augusta Quaynor is a British filmmaker who specialises in fashion and beauty films. After graduating from Bournemouth University, UK, with a bachel...",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog8-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog8-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog8-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "A GREEN CORNER WITH ANOUD ALZABEN",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, explores her deep connection with nature through scenes of greenery in her home....",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: null,
			section2: null,
			section3: null,
		},
	},
	{
		title: "THE CREATIVES: OLIVIA LEE",
		description:
			"We speak to Liv Lee, the artist behind our SS21 Lily Hawaiian print shirt, on her signature style and her dream summer vacation.",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog10-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog10-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog10-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
	{
		title: "A MESSAGE FROM OUR FOUNDER",
		description:
			"Architect, designer and movement and mobility coach Anoud Alzaben, explores her deep connection with nature through scenes of greenery in her home....",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: null,
			section2: null,
			section3: null,
		},
	},
	{
		title: "BOUGUESSA’S GUIDE TO: HUDA KANJ’S GREEN KALE AND BROWN RICE SALAD",
		description:
			"Lebanese chef @HealthybyHuda shares a delicious salad recipe to up your greens game this year.",
		publishDate: "MAY 23, 2021",
		innerSections: {
			section1: {
				img: "images/blog12-inner-img1.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section2: {
				img: "images/blog12-inner-img2.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
			section3: {
				img: "images/blog5-inner-img3.webp",
				description:
					"Mónica’s travels abroad have a strong influence on her work, particularly Manhattan’s Art Déco architecture. Closer to home, she takes away a renewed love for the modernist aesthetic from the city of Caracas, in turn creating pieces that are both sculptural and collectable and boast a touch of eclecticism. ",
			},
		},
	},
];
const route = useRoute();
const slug = route.params.slug.split("-").join(" ");
console.log(slug);
const blog = blogItems.findIndex((item) => item.title.toLowerCase() === slug);
if (blog !== -1) {
	console.log(blog);
} else {
	console.log("notfound");
}
</script>

<style scoped>
h1 {
	text-align: center;
	margin-block: 3rem;
	font-weight: 500;
	font-size: 1.75rem;
}
.blog-wrapper {
	max-width: 105rem;
	width: 90%;
	margin: 0 auto;
}
.blog-content article {
	display: flex;
	align-items: center;
	gap: 3rem;
	margin-bottom: 3rem;
	width: 100%;
}

.blog-content article:first-child,
.blog-content article:last-child {
	flex-direction: row-reverse;
}

.blog-content article p {
	font-size: 1.25rem;
	line-height: 1.7;
	color: rgb(77, 77, 77);
}

.blog-content article > * {
	width: 50%;
}
@media (max-width: 62.5em) {
	.blog-content article {
		flex-direction: column;
	}
	.blog-content article:first-child,
	.blog-content article:last-child {
		flex-direction: column;
	}
	.blog-content article p {
		width: 100%;
		text-align: center;
		font-size: 1rem;
	}
	.blog-content article > * {
		width: auto;
	}
}
@media (max-width: 30em) {
	.blog-content article p {
		font-size: 0.85rem;
	}
}
.intro {
	width: 100%;
	margin-bottom: 5rem;
}
.intro .title {
	font-size: 2rem;
	margin-bottom: 3rem;
}
.intro .description {
	font-size: 1rem;
	line-height: 1.8;
	color: rgb(48, 48, 48);
	font-weight: 300;
}
.intro .date {
	font-size: 0.8rem;
	color: rgb(158, 158, 158);
	letter-spacing: 0.2rem;
	margin-bottom: 0.5rem;
	margin-top: 2rem;
}
.blog-background {
	width: 100%;
	min-height: 100vh;
	background-repeat: no-repeat;
	background-position: center 40% !important;
	background-repeat: no-repeat !important;
	background-attachment: fixed !important;
}
/* @media (max-width: 40em) {
	.blog-background {
		background:url('images/')!important;
	}
} */
</style>
