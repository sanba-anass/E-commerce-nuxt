import { Head } from '../.nuxt/components';
<template>
	<div class="drawer">
		<nav>
			<div class="input-wrapper">
				<input
					class="search-input"
					type="text"
					name=""
					id=""
					placeholder="Search for..."
				/>
				<SearchIcon class="search-icon" />
			</div>
			<ul>
				<li>
					<NuxtLink to="/" class="nav-link">home</NuxtLink>
				</li>
				<li class="collabsable-button-shop">
					<div @click="iscollabsbledShop = !iscollabsbledShop" class="flex">
						<NuxtLink class="nav-link shop">shop </NuxtLink>
						<button class="plus-btn">
							<PlusIcon v-if="iscollabsbledShop" />
							<ClientOnly v-else>
								<MinusIcon />
							</ClientOnly>
						</button>
					</div>
					<div>
						<div
							v-if="!iscollabsbledShop"
							:class="{
								'collabsable-shop-content': !discover && !catigories,
								'margin-shop': !(!discover && !catigories),
							}"
						>
							<div
								:class="{ 'proper-h': !iscollabsbledShop }"
								v-if="!discover && !catigories"
								class="shop-links"
							>
								<NuxtLink
									@click="discover = true"
									class="nav-link inner-shop-link"
									>Discover
								</NuxtLink>

								<NuxtLink
									@click="
										discover = false;
										catigories = true;
									"
									class="nav-link inner-shop-link"
									>catigories
								</NuxtLink>
							</div>
							<div class="nested-discover-links" v-if="discover">
								<button @click="discover = false" class="back-button-menu">
									back
								</button>
								<div class="nested-discover-links wrapper">
									<NuxtLink class="nav-link">All Products</NuxtLink>
									<NuxtLink class="nav-link">New In</NuxtLink>
									<NuxtLink class="nav-link">Best Sellers</NuxtLink>
									<NuxtLink class="nav-link">Last Piece</NuxtLink>
								</div>
							</div>

							<div v-if="catigories">
								<button @click="catigories = false" class="back-button-menu">
									back
								</button>
								<div class="nested-discover-links wrapper">
									<NuxtLink class="nav-link">Coats & Long Jackets</NuxtLink>
									<NuxtLink class="nav-link">Dresses</NuxtLink>
									<NuxtLink class="nav-link">Blazers</NuxtLink>
									<NuxtLink class="nav-link">Tops</NuxtLink>
									<NuxtLink class="nav-link">Pants</NuxtLink>
									<NuxtLink class="nav-link">Skirts</NuxtLink>
									<NuxtLink class="nav-link">Accessories</NuxtLink>
									<NuxtLink class="nav-link">Knitwear</NuxtLink>
									<NuxtLink class="nav-link">Shorts</NuxtLink>
									<NuxtLink class="nav-link">Swimwear</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div
						@click="iscollabsbledCollections = !iscollabsbledCollections"
						class="flex collection"
					>
						<NuxtLink class="nav-link">collections</NuxtLink>
						<button class="plus-btn">
							<PlusIcon v-if="iscollabsbledCollections" />
							<ClientOnly v-else>
								<MinusIcon />
							</ClientOnly>
						</button>
					</div>
					<div
						:class="{ 'expande-collections': !iscollabsbledCollections }"
						class="collabsable-collections"
					>
						<div class="collabsable-content" v-if="!iscollabsbledCollections">
							<NuxtLink class="nav-link collection-link"
								>FALL WINTER 2023</NuxtLink
							>
							<NuxtLink class="nav-link collection-link"
								>SPRING SUMMER 2023</NuxtLink
							>
						</div>
					</div>
				</li>

				<li><NuxtLink class="nav-link">about</NuxtLink></li>
				<li><NuxtLink class="nav-link">journal</NuxtLink></li>
			</ul>
			<ul class="secondary-links">
				<li>
					<NuxtLink>Retailers</NuxtLink>
				</li>
				<li><NuxtLink>Contact</NuxtLink></li>
				<li>
					<NuxtLink to="/account/login">Account</NuxtLink>
				</li>
			</ul>
		</nav>
		<ul class="social-links">
			<NuxtLink><FacebookIcon /></NuxtLink>
			<NuxtLink><InstagramIcon /> </NuxtLink>
			<NuxtLink><PinterestIcon /></NuxtLink>
			<NuxtLink><YoutubeIcon /></NuxtLink>
		</ul>
	</div>
</template>

<script setup>
const iscollabsbledShop = ref(true);
const iscollabsbledCollections = ref(true);
const discover = ref(false);
const catigories = ref(false);
</script>

<style scoped>
.input-wrapper {
	position: relative;
}
.search-input {
	margin-bottom: 2rem;
	background-color: #3d3d3d;
	border: 0;
	padding: 0.5rem;
	width: 100%;
	color: white;
}
.search-icon {
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	width: 1rem;
	height: 1rem;
	color: white;
}
.search-input:focus {
	outline: none;
}
.search-input::placeholder {
	color: rgb(160, 160, 160);
}
.wrapper {
	padding-left: 2rem;
	border-left: 1px solid rgb(90, 90, 90);
}
.shop-links {
	transition: 0.3s !important;
}
.margin-shop {
	margin-top: 1rem;
}

.nested-discover-links .nav-link {
	color: #969696;
	font-size: 0.9rem;
	text-transform: none;
}

.nested-discover-links .nav-link:not(:last-child) {
	margin-bottom: 1rem;
}
.nested-discover-links .nav-link:hover {
	color: white;
}

.shop-collabsable-button {
	height: 15rem;
	transition: 0.3s;
}

.back-button-menu {
	background: 0;
	color: white;
	border: 0;
	text-decoration: underline;
	margin-bottom: 1.5rem;
}
.nav-link.inner-shop-link {
	font-size: 0.8rem;
	margin-bottom: 0;
	color: rgb(168, 168, 168);
}

.collabsable-shop-content .nav-link.inner-shop-link {
	display: block;
	margin-bottom: 1.5rem;
}
.collabsable-shop-content .nav-link.inner-shop-link:hover {
	color: white;
}
.plus-btn {
	background: 0;
	border: 0;
	font-size: 1.2rem;
	color: white;
}

.collabsable-content {
	margin-top: 2rem;
}
.collabsable-shop-content {
	margin-top: 2rem;
}
.opacity {
	opacity: 1;
}

.flex {
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
	cursor: pointer;
}
.drawer {
	height: calc(100vh - 58px);
	top: 58px;
	width: 18rem;
	transform: translateX(-100%);
	background-color: #1c1b1b;
	transition-timing-function: ease-in-out;
	position: fixed;
	left: 0;
	z-index: 999999999;
	transition: 0.5s transform;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.drawer nav {
	display: flex;
	flex-direction: column;
	padding: 2rem;
}
.drawer nav ul li {
	width: 100%;
}
.drawer nav ul a {
	color: white;
	text-decoration: none;
}
.nav-link {
	font-size: 0.9rem;
	text-transform: uppercase;
	cursor: pointer;
	display: block;
}
.collection-link.nav-link {
	font-size: 0.75rem;
	margin-bottom: 1rem;
	color: rgb(168, 168, 168);
	letter-spacing: 1px;
}
.collection-link.nav-link:hover {
	color: white;
}
.drawer nav .secondary-links {
	margin-block: 2rem;
}
.drawer nav .secondary-links li a {
	font-size: 0.85rem;
	color: rgb(168, 168, 168);
	display: inline-block;
	margin-bottom: 1rem;
}
.drawer nav .secondary-links li a:hover {
	color: white;
}
.drawer nav ul:not(.secondary-links, .social-links) li::after {
	content: "";
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: rgb(53, 53, 53);
	margin-block: 1rem;
}

.drawer nav ul {
	list-style: none;
}
@media (min-width: 76.625rem) {
	.drawer {
		display: none;
	}
}
@media (max-width: 23.5rem) {
	.drawer {
		width: 15rem;
	}
}

.social-links * {
	cursor: pointer;
}
.social-links {
	display: flex;
	align-items: center;
	gap: 2rem;
	padding: 1rem;
	left: 0;
	right: 0;
	justify-content: center;
	border-top: 1px solid rgb(51, 51, 51);
	background-color: #1c1b1b;
	margin-top: auto;
}

/* 635 x 680 */
</style>
