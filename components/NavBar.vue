<template>
	<Teleport class="tp" to="body">
		<Drawer :class="{ isOpen: isOpen }" />
		<div @click="overlayClose(null)" v-if="isOpen" class="overlay"></div>
	</Teleport>
	<nav @mouseleave="isVisible = false">
		<button @click="toggleDrawer" class="menu-button">
			<MenuIcon :isOpen="isOpen" :class="{ open: isOpen }" />
		</button>

		<ul>
			<li>
				<NuxtLink
					@click="isVisible = false"
					:active-class="'active-style'"
					@mouseenter="isVisible = false"
					to="/"
					class="nav-link"
					>home</NuxtLink
				>
			</li>
			<li>
				<NuxtLink
					:to="`/shop?page=${1}`"
					:active-class="'active-style'"
					@mouseenter="
						isVisible = true;
						isCollection = false;
					"
					@click="isVisible = false"
					class="nav-link shop"
					>shop
				</NuxtLink>
			</li>
			<li>
				<NuxtLink
					:active-class="'active-style'"
					@mouseenter="
						isVisible = true;
						isCollection = true;
					"
					@click="isVisible = false"
					class="nav-link"
					to="/collections"
					>collections</NuxtLink
				>
			</li>
			<li>
				<NuxtLink
					@click="isVisible = false"
					to="/about"
					:active-class="'active-style'"
					@mouseenter="isVisible = false"
					class="nav-link"
					>about</NuxtLink
				>
			</li>
			<li>
				<NuxtLink
					@click="isVisible = false"
					:active-class="'active-style'"
					to="/blogs"
					@mouseenter="isVisible = false"
					class="nav-link"
					>blogs</NuxtLink
				>
			</li>
		</ul>
		<NuxtLink @click="isVisible = false" to="/" class="logo nav-link"
			>d<span>r</span>ess do<span>w</span>n
		</NuxtLink>
		<div class="nav-icon-links">
			<NuxtLink class="cart-button" @click="isVisible = false" to="/wishlist"
				><HeartIcon />
				<Badge :num="(allWishlist?.count as number)" />
			</NuxtLink>
			<NuxtLink
				@click="isVisible = false"
				:to="user ? '/account/profile' : '/account/login'"
				><AccountIcon />
			</NuxtLink>
			<NuxtLink
				class="nav-icon-search"
				@click="
					isVisible = false;
					showSideBar();
				"
				><SearchIcon
			/></NuxtLink>
			<NuxtLink
				class="cart-button"
				:class="{ disableIconLink: pending }"
				@click="
					() => {
						if (pending) {
							return;
						}
						openCartDrawer();
						isVisible = false;
					}
				"
				><CartIcon :class="{ disableIconLink: pending }" />
				<Badge :num="(allOrderItems?.count as number)" />
			</NuxtLink>
		</div>
	</nav>
	<BigMenu
		class="menu"
		@mouseenter="isVisible = true"
		@mouseleave="
			($event:MouseEvent) => {
				if ($event.clientY < 100) {
					return;
				}
				
				isVisible = false;
			}
			"
		:class="{ isVisible, animation: !isVisible && !isLoadingPage }"
	>
		<div class="container" :class="{ isVisible }">
			<div class="links" v-if="!isCollection">
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
					<li>
						<NuxtLink
							:style="{ 'text-decoration': 'none' }"
							@click="isVisible = false"
							to="/collections/fall-winter-2023"
							>Fall Winter 2023</NuxtLink
						>
					</li>
					<li>
						<NuxtLink
							@click="isVisible = false"
							to="/collections/spring-summer-2023"
							>Spring Summer 2023</NuxtLink
						>
					</li>
				</ul>
			</div>
			<figure v-if="!isCollection" class="img">
				<div class="inner-img">
					<NuxtLink
						><NuxtImg loading="lazy" src="images/menu-img3.webp"
					/></NuxtLink>
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
							@click="isVisible = false"
							to="/collections/fall-winter-2023"
							><NuxtImg loading="lazy" src="images/img-collection1.webp"
						/></NuxtLink>
					</div>
					<figcaption>fall winnter</figcaption>
				</figure>
				<figure>
					<div class="img-collection">
						<NuxtLink
							@click="isVisible = false"
							to="/collections/spring-summer-2023"
							><NuxtImg loading="lazy" src="images/img-collection2.webp"
						/></NuxtLink>
					</div>
					<figcaption>spring summmer 2023</figcaption>
				</figure>
			</div>
		</div>
	</BigMenu>
	<Teleport to="body">
		<ClientOnly>
			<div
				:class="{ isVisibleSearchMenu: isVisibleSearchMenu }"
				class="search-menu"
			>
				<button
					@click="
						isVisibleSearchMenu = false;
						hideSideBar();
					"
					class="close-button"
				>
					<CloseIcon />
				</button>
				<div class="content">
					<p class="title">What Are You Looking For?</p>
					<form @submit.prevent="searchProductByTitle()" class="input">
						<input
							v-model.trim="searchTerm"
							type="text	"
							name=""
							id=""
							placeholder="Search for..."
						/>
						<div class="search-buttons">
							<button
								@click="searchTerm = ''"
								v-if="searchTermFilled"
								type="button"
								class="search-button"
							>
								<CloseIcon />
							</button>
							<button
								type="submit"
								:disabled="searchPending"
								class="search-button"
							>
								<SearchIcon v-if="!searchPending" />
								<Spinner v-else />
							</button>
						</div>
					</form>
					<div class="trending-searches">
						<div class="title">trending searches:</div>
						<div class="tags">
							<button :key="tag" @click="searchByTag(tag)" v-for="tag in tags">
								{{ tag }}
							</button>
						</div>
					</div>
					<p class="title">Popular Categories</p>
				</div>
				<div class="searchCateroryItems">
					<SearchCateroryItem
						@closeMenu="closeMenu(item.brand)"
						v-for="item in searchCateroryItems.data"
						:title="item.brand"
						:amount="5"
						:ImageUrl="item.preview_images[0]"
						@click="hidePagination"
					/>
				</div>
			</div>
		</ClientOnly>
	</Teleport>

	<Teleport to="body">
		<div
			@click="hideSideBar"
			v-if="isVisibleSearchMenu"
			class="overlay-search"
		></div>
	</Teleport>
</template>

<script setup lang="ts">
const pending = useAddCartPending();
const products = useProductList();
const route = useRoute();
const router = useRouter();
const { hidePagination } = usePagination();

const searchTerm = ref(route.query?.q?.split(" ").join(" or "));
const searchTermFilled = computed(() => searchTerm?.value?.length > 0);
const isVisibleSearchMenu = ref(false);
const searchPending = ref(false);
const supabase = useSupabaseClient();
const { data: allOrderItems } = await useAsyncData(
	async () => await supabase.from("order_item").select("*", { count: "exact" })
);
const { data: allWishlist } = await useAsyncData(
	async () => await supabase.from("wishlist").select("*", { count: "exact" })
);

const closeMenu = async (item: string) => {
	searchPending.value = true;
	await router.replace(`/shop?page=1&q=${item}`);
	const { data } = await supabase
		.from("product")
		.select()
		.textSearch("brand", item, {
			type: "websearch",
			config: "english",
		});

	products.value = data;
	searchPending.value = false;
	isVisibleSearchMenu.value = false;
};
const searchWords = computed(() =>
	searchTerm.value
		?.split(" ")
		?.map((word, index, arr) =>
			index === arr.length - 1 ? word : `${word} or`
		)
		?.join(" ")
		?.trim()
);
const searchProductByTitle = async (execute = true) => {
	if (searchTerm.value === "" && execute) {
		alert("search term can not be empty");
		return;
	}
	searchPending.value = true;
	await router.replace(
		`/shop?page=1&q=${searchWords.value?.split("or ").join("")}`
	);
	const { data } = await supabase
		.from("product")
		.select()
		.textSearch("title", route.query?.q?.split(" ").join(" or "), {
			type: "websearch",
			config: "english",
		});

	products.value = data;
	searchPending.value = false;
	isVisibleSearchMenu.value = false;
	hidePagination();
};

if (route.query?.q !== undefined && route.query?.q !== "") {
	searchProductByTitle(false);
} else if (route.query?.q === "") {
	products.value.length = 0;
}

function showSideBar() {
	isVisibleSearchMenu.value = true;
}
function hideSideBar() {
	isVisibleSearchMenu.value = false;
}
const searchByTag = async (item: string) => {
	console.log(item);
	searchPending.value = true;
	await router.replace(`/shop?page=1&q=${item}`);
	const { data } = await supabase
		.from("product")
		.select()
		.textSearch("title", item, {
			type: "websearch",
			config: "english",
		});

	products.value = data;
	searchPending.value = false;
	isVisibleSearchMenu.value = false;
	hidePagination();
};
const tags = ["shirt", "cotton", "jacket", "jumper", "Coat"];

const { data: searchCateroryItems } = await useAsyncData(
	async () => await supabase.from("product").select("*").range(27, 30)
);

const { openCartDrawer } = useOpenCartDrawer();
const user = useSupabaseUser();

const isLoadingPage = ref(true);
function overlayClose(mediaQuery: MediaQueryList | null) {
	document.body.style.overflow = "visible";
	isOpen.value = false;
	if (mediaQuery?.matches) {
		console.log("matches");
		document.body.style.overflow = "visible";
		isOpen.value = false;
	}
}
const matches = ref(false);
if (process.client) {
	const mediaQuery = window.matchMedia("(min-width: 76.625rem)");

	mediaQuery.addEventListener("change", () => {
		overlayClose(mediaQuery);
	});
}

onBeforeMount(() => {
	isLoadingPage.value = false;
});
const isVisible = ref(false);
const isCollection = ref(false);
const { isOpen, toggleDrawer } = useNavDrawer();
</script>

<style scoped>
.nav-icon-links .disableIconLink {
	cursor: not-allowed !important;
}
.search-button {
	background: 0;
	cursor: pointer;
	border: 0;
	transform: scale(1.3);
}
.container {
	display: flex;
	max-width: 105rem;
	margin: 1rem auto;
	height: auto !important;
}
.links {
	display: flex;
}
.searchCateroryItems {
	display: flex;
	justify-content: center;
	gap: 3rem;
	padding-bottom: 4rem;
}
.search-menu {
	background-color: rgb(255, 255, 255);
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 99999;
	pointer-events: none;
	position: fixed;
	opacity: 0;
	transform: translateY(-100%);
	transition: 0.5s opacity, 0.5s transform;
	border-bottom: 1px solid rgb(226, 226, 226);
}

@media (max-width: 66.25em) {
	.search-menu {
		display: none;
	}
}
.isVisibleSearchMenu {
	opacity: 1;
	pointer-events: all;
	transform: translateY(0%);
}
.search-buttons {
	display: flex;
	gap: 1.25rem;
	transform: scale(0.9);
}

.close-button {
	position: absolute;
	right: 1.5rem;
	top: 1.25rem;
	background: 0;
	border: 0;
	transition: 0.3s;
	transform: scale(1.5);
	transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}
.close-button:hover {
	transform: scale(1.5) rotate(90deg);
}

.search-menu .content {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.search-menu .title {
	text-align: center;
	margin-top: 3.5rem;
	margin-bottom: 2rem;
	font-weight: 600;
	font-size: 0.85rem;
}
.search-menu .content input {
	border: 0;
	width: 100%;
	padding: 0.5rem;
	font-size: 1rem;
}
.search-menu .content .input {
	border-bottom: 1px solid rgb(209, 209, 209);
	width: 55%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 0.75rem;
	margin-bottom: 3rem;
}
.search-menu .content input:focus {
	outline: none;
}
.search-menu .content .trending-searches {
	display: flex;
	align-items: center;
}
.search-menu .content .trending-searches .title {
	font-size: 0.95rem;
	margin: 0;
	text-transform: uppercase;
	font-weight: 500;
}
.trending-searches .tags button {
	background: 0;
	border: 0;
	margin-left: 1rem;
	background-color: rgb(243, 243, 243);
	font-size: 0.85rem;
	padding: 0.2rem 0.7rem;
	cursor: pointer;
	transition: all 0.3s;
}
.trending-searches .tags button:hover {
	background-color: #e6733e;
	color: white;
}
.tp {
	z-index: 9999999;
}

.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.356);
	z-index: 1;
}
.overlay-search {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.35);
	z-index: 99990;
}
@media (max-width: 66.25em) {
	.overlay-search {
		display: none;
	}
}
.isOpen {
	transform: translateX(0%);
}
.animation {
	opacity: 1;
	z-index: 999;
	height: 65vh;
	color: rgb(20, 20, 20);
	animation: fade-reveal-reverse 0.5s forwards;
	pointer-events: none;
}
@keyframes fade-reveal-reverse {
	0% {
		height: 28.125rem;
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
	top: 0;
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
.container ul li a:hover {
	color: #e6733e;
}
.Categories {
	display: flex;
	gap: 3rem;
	height: fit-content;
	margin-right: 15rem;
}
.cart-button {
	position: relative;
	display: inline-block;
}
.none {
	display: none;
}
.container ul li:first-child {
	text-transform: uppercase;
	color: rgb(163, 163, 163);
	font-family: "Lato" sans-serif;
	font-weight: 400;
	margin-bottom: 1.5rem;
}
.container ul li {
	display: block;
	font-size: 0.9rem;
}
.container ul li:not(:last-child) {
	margin-bottom: 1rem;
}

.isVisible {
	opacity: 1;
	z-index: 999;
	height: 0;
	color: rgb(20, 20, 20);
	animation: fade-reveal 0.5s forwards;
}

@keyframes fade-reveal {
	0% {
		height: 0;
		opacity: 0;
	}
	100% {
		height: 28.125rem;
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
	position: sticky;
	top: 0;
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
@media (max-width: 76.625em) {
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
nav .nav-link:not(.logo.nav-link).active-style::after {
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
@media (max-width: 66.25em) {
	.nav-icon-search {
		display: none;
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
a {
	text-decoration: none;
}
</style>
