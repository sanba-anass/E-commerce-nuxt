<template>
	<div class="container">
		<div class="title">
			<HeartIcon class="icon" />
			<h2>Wishlist</h2>
		</div>
		<HeartIcon class="icon2" />
		<h3>YOUR WISHLIST IS EMPTY</h3>

		<p>
			Create a personalized selection of your favorite items and view them all
			on one page. Simply click on the
			<span><HeartIcon class="icon3" /></span> loves icon on items that you
			love, and they'll all be saved for you here!
		</p>
		<NuxtLink class="button">Return to Shop</NuxtLink>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container .button {
	all: unset;
	text-transform: uppercase;
	background-color: black;
	padding: 0.75rem 1rem;
	color: white;
	font-size: 0.85rem;
	cursor: pointer;
	display: inline-block;
}

.title {
	display: flex;
	align-items: center;
	margin-top: 2.5rem;
	margin-bottom: 5rem;
	justify-content: center;
	gap: 1rem;
}
.icon {
	width: 1.75rem;
	height: 1.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon2 {
	width: 1.5rem;
	height: 1.5rem;
}
.icon3 {
	width: 1rem;
	height: 1rem;
	position: relative;
	/* Adjust these values accordingly */
	top: 4px;
    margin: 0 0.1rem;
}
.container {
	max-width: 105rem;
	margin: 0 auto;
	width: 60%;
	text-align: center;
}

h2 {
	font-size: 2.5rem;
}
h3 {
	margin-top: 1rem;
	font-size: 1.5rem;
	font-weight: 400;
	margin-bottom: 2rem;
}
@media (max-width: 62.5em) {
	.container {
		width: 100%;
		padding-inline: 3rem;
	}
}
@media (max-width: 42em) {
	.container {
		padding-inline: 1.25rem;
	}
	h3 {
		font-size: 1.22rem;
	}
	h2 {
		font-size: 2.1rem;
	}
}
@media (max-width: 31.25rem) {
	.container {
		padding-inline: 1rem;
	}
}
p {
	color: rgb(150, 150, 150);
	line-height: 1.7;
	margin-bottom: 2rem;
}
</style>
