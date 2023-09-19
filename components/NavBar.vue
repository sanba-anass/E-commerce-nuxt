<template>
	<ClientOnly>
		<Teleport class="tp" to="body">
			<Drawer :class="{ isOpen: isOpen }" />
			<div @click="isOpen = false" v-if="isOpen" class="overlay"></div>
		</Teleport>
	</ClientOnly>
	<nav @mouseleave="isVisible = false">
		<button @click="toggleDrawer" class="menu-button">
			<MenuIcon :isOpen="isOpen" :class="{ open: isOpen }" />
		</button>

		<ul>
			<li><NuxtLink to="/" class="nav-link">home</NuxtLink></li>
			<li>
				<NuxtLink
					@mouseenter="
						isVisible = true;
						isCollection = false;
					"
					class="nav-link shop"
					>shop
				</NuxtLink>
			</li>
			<li>
				<NuxtLink
					@mouseenter="
						isVisible = true;
						isCollection = true;
					"
					class="nav-link"
					>collections</NuxtLink
				>
			</li>
			<li><NuxtLink class="nav-link">about</NuxtLink></li>
			<li><NuxtLink class="nav-link">journal</NuxtLink></li>
		</ul>
		<NuxtLink to="/" class="logo nav-link"
			>d<span>r</span>ess do<span>w</span>n
		</NuxtLink>
		<div class="nav-icon-links">
			<NuxtLink><HeartIcon /></NuxtLink>
			<NuxtLink to="/account/login"><AccountIcon /></NuxtLink>
			<NuxtLink><SearchIcon /></NuxtLink>
			<NuxtLink><CartIcon /></NuxtLink>
		</div>
	</nav>
	<BigMenu
		class="menu"
		@mouseenter="isVisible = true"
		@mouseleave="
			($event) => {
				if ($event.clientY < 100) {
					return;
				}

				isVisible = false;
			}
		"
		:class="{ isVisible, animation: !isVisible }"
	>
		<div v-if="!isCollection" class="none" :class="{ isVisible }">
			<ul class="discover-Links">
				<li>Discover</li>
				<li><NuxtLink>All Products</NuxtLink></li>
				<li><NuxtLink>New in</NuxtLink></li>
				<li><NuxtLink>Best Sellers</NuxtLink></li>
				<li><NuxtLink>Last Piece</NuxtLink></li>
			</ul>
			<div class="Categories">
				<ul>
					<li>Categories</li>
					<li><NuxtLink>Coats & Long Jackets</NuxtLink></li>
					<li><NuxtLink>Dresses</NuxtLink></li>
					<li><NuxtLink>Blazres</NuxtLink></li>
					<li><NuxtLink>Tops</NuxtLink></li>
					<li><NuxtLink>Pants</NuxtLink></li>
				</ul>
				<ul class="additional">
					<li class="hide">hidden</li>
					<li><NuxtLink>Skirts</NuxtLink></li>
					<li><NuxtLink>Accessories</NuxtLink></li>
					<li><NuxtLink>Kintwear</NuxtLink></li>
					<li><NuxtLink>Shorts</NuxtLink></li>
					<li><NuxtLink>Swimwear</NuxtLink></li>
				</ul>
			</div>
			<ul class="Collections">
				<li>collections</li>
				<li><NuxtLink>Fall Winter 2023</NuxtLink></li>
				<li><NuxtLink>Spring Summer 2023</NuxtLink></li>
			</ul>
		</div>
		<figure v-if="!isCollection" class="img">
			<div class="inner-img">
				<NuxtLink><img src="~/assets/images/menu-img3.jpg" /></NuxtLink>
			</div>
			<figcaption>
				shop the new summer 2023
				<div>collection</div>
			</figcaption>
		</figure>
		<div class="collections" v-else>
			<figure>
				<div class="img-collection">
					<NuxtLink
						><img src="~/assets/images/img-collection1.webp"
					/></NuxtLink>
				</div>
				<figcaption>fall winnter</figcaption>
			</figure>
			<figure>
				<div class="img-collection">
					<NuxtLink
						><img src="~/assets/images/img-collection2.webp"
					/></NuxtLink>
				</div>
				<figcaption>spring summmer 2023</figcaption>
			</figure>
		</div>
	</BigMenu>
</template>

<script setup>
const isVisible = ref(false);
const isCollection = ref(false);
const isOpen = ref(false);
const toggleDrawer = () => {
	isOpen.value = !isOpen.value;
	document.body.style.overflow = isOpen.value ? "hidden" : "visible";
};
</script>

<style scoped>
.tp {
	z-index: 9999999;
}

.overlay {
	position: fixed; /* Sit on top of the page content */
	width: 100%; /* Full width (cover the whole page) */
	height: 100%; /* Full height (cover the whole page) */
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.295); /* Black background with opacity */
	z-index: 1; /* Specify a stack order in case you're using a different order for other elements */
	/* Add a pointer on hover */
}
.isOpen {
	transform: translateX(0%);
}
.animation {
	opacity: 1;
	z-index: 999;
	height: 65vh;
	display: flex;
	color: rgb(20, 20, 20);
	animation: fade-reveal-reverse 0.5s forwards;
	pointer-events: none;
}
@keyframes fade-reveal-reverse {
	0% {
		height: 65vh;
		opacity: 1;
	}
	100% {
		height: 0;
		opacity: 0;
	}
}
.menu-button {
	background: 0;
	border: 0;
}
.collections {
	display: flex;
	justify-content: space-around;
	width: 100%;
}
.img-collection img {
	display: block;
	max-width: 100%;
	cursor: pointer;
	transition: transform 5s;
}

.img-collection {
	width: 400px;
	overflow: hidden;
}
.img-collection img:hover {
	transform: scale(1.2);
}
.menu {
	padding: 3rem;
	margin-top: 3rem;
	position: fixed;
	border-bottom: 1px solid rgb(223, 223, 223);
}
figcaption {
	font-size: 0.85rem;
	margin-top: 1rem;
	color: rgb(36, 36, 36);
	text-align: center;
	text-transform: uppercase;
}
.menu .img {
	margin-left: auto;
	max-width: 320px;
}
.menu .inner-img {
	overflow: hidden;
}

.menu .inner-img img:hover {
	transform: scale(1.2);
}
.menu .inner-img img {
	display: block;
	max-width: 100%;
	cursor: pointer;
	transition: transform 5s;
}

.additional .hide {
	opacity: 0;
}
.none ul li a:hover {
	color: #e6733e;
}
.Categories {
	display: flex;
	gap: 3rem;
	height: fit-content;
	margin-right: 15rem;
}
.none {
	display: none;
	align-items: start;
	height: auto !important;
}
.none ul li:first-child {
	text-transform: uppercase;
	color: rgb(163, 163, 163);
	font-family: "Lato" sans-serif;
	font-weight: 400;
	margin-bottom: 1.5rem;
}
.none ul li {
	display: block;
	font-size: 0.9rem;
}
.none ul li:not(:last-child) {
	margin-bottom: 1rem;
}

.isVisible {
	opacity: 1;
	z-index: 999;
	height: 0;
	display: flex;
	color: rgb(20, 20, 20);
	animation: fade-reveal 0.5s forwards;
}

@keyframes fade-reveal {
	0% {
		height: 0;
		opacity: 0;
	}
	100% {
		height: 65vh;
		opacity: 1;
	}
}
.discover-Links {
	margin-right: 8rem;
}

ul {
	list-style: none;
}

.logo-links-wrapper {
	align-items: center;
	display: flex;
	justify-content: space-between;
	flex-basis: 40%;
}
.nav-icon-links {
	display: flex;
	align-items: center;
	gap: 1.75rem;
	justify-content: flex-end;
	flex-basis: 40%;
}
.nav-icon-links * {
	cursor: pointer;
}

nav {
	padding: 0 3.125rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: rgb(24, 24, 24);
	transition: 0.2s background-color, color;
	transition-timing-function: linear;
	opacity: 1;
	background-color: rgb(255, 255, 255);
	max-width: 105rem;
	margin: 0 auto;
	position: fixed;
	z-index: 9999;
	width: 100%;
	border-bottom: 1px solid rgb(216, 216, 216);
}
@media (max-width: 76.625rem) {
	nav {
		padding: 1rem 3.125rem;
	}
}
@media (max-width: 58.5625rem) {
	nav {
		padding: 1rem 2rem;
	}
}
@media (max-width: 28.625rem) {
	nav {
		padding: 1rem 1.25rem;
	}
}
@keyframes rev-reveal {
	0% {
		transform: translate(0, -50%);
		opacity: 0;
	}
	100% {
		transform: translate(0, 0);
		opacity: 1;
	}
}

nav ul {
	display: flex;
	gap: 3rem;
	flex-basis: 40%;
}

ul li {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
@media (max-width: 76.625rem) {
	ul li {
		display: none;
	}
}
nav .nav-link {
	text-transform: uppercase;
	cursor: pointer;
	font-size: 0.8rem;
	position: relative;
	text-decoration: none;
}
nav .nav-link:not(.logo.nav-link) {
	min-height: 3.6875rem;
	display: flex;
	align-items: center;
}
nav .nav-link:not(.logo.nav-link)::after {
	content: "";
	position: absolute;
	background-color: rgb(20, 20, 20);
	width: 0%;
	height: 2.5px;
	bottom: 0;
	transition: 0.3s width;
}
nav .nav-link:not(.logo.nav-link):hover::after {
	width: 100%;
}

nav .logo {
	font-weight: 500;
	text-transform: uppercase;
	flex-basis: 20%;
	text-align: center;
	font-family: "Raleway", sans-serif;
	font-size: 0.95rem;
	white-space: nowrap;
	margin-inline: 1rem;
}

.logo.nav-link span {
	font-weight: 600;
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

@media (max-width: 41.25em) {
	a[href="/account/login"] {
		display: none;
	}
	.nav-icon-links {
		gap: 1rem;
	}
	.nav-icon-links a:first-child {
		display: none;
	}
}
@media (min-width: 76.625rem) {
	.overlay {
		display: none;
	}
}
</style>
