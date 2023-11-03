<template>
	<div class="title">
		<HeartIcon class="icon" />
		<h2>Wishlist</h2>
	</div>
	<div class="container">
		<div v-if="wishlist?.data?.length === 0">
			<HeartIcon class="icon2" />
			<h3>YOUR WISHLIST IS EMPTY</h3>
			<p>
				Create a personalized selection of your favorite items and view them all
				on one page. Simply click on the
				<span><HeartIcon class="icon3" /></span> loves icon on items that you
				love, and they'll all be saved for you here!
			</p>
			<NuxtLink to="/shop?page=1" class="button">Return to Shop</NuxtLink>
		</div>
		<div v-else>
			<header>
				<ul class="top-items">
					<li>product</li>
					<li>price</li>
					<li>action</li>
				</ul>
			</header>
			<ul>
				<WishlistItem
					v-for="item in wishlist?.data"
					:title="item.title"
					:image="item.image"
					:sku="item.sku"
					:price="item.price"
					:key="item.id"
					:id="item.id"
					:productId="item.product_id"
				/>
			</ul>
			<div class="buttons">
				<button
					:disabled="isDeletingAllPending"
					@click="deleteAll"
					class="delete"
					:class="{ 'not-allowed': isDeletingAllPending }"
				>
					<span v-if="!isDeletingAllPending">Delete All</span>
					<Spinner v-else />
				</button>
				<button
					:disabled="isAddAllPending"
					@click="addAllToCart"
					class="add"
					:class="{ 'not-allowed2': isAddAllPending }"
				>
					<span v-if="!isAddAllPending">Add All To Cart</span>
					<Spinner v-else />
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ keepalive: false });
const { openCartDrawer } = useOpenCartDrawer();
const supabase = useSupabaseClient();
const isDeletingAllPending = ref(false);
const isAddAllPending = ref(false);
const products = useProductList();
const { data: wishlist } = await useAsyncData(
	async () => await supabase.from("wishlist").select("*")
);
const deleteAll = async () => {
	isDeletingAllPending.value = true;
	await supabase.from("wishlist").delete().neq("id", 0);

	await supabase
		.from("product")
		.update({ isFavourite: false })
		.in(
			"id",
			wishlist.value?.data?.map((product) => product.product_id)
		);

	await refreshNuxtData();
	isDeletingAllPending.value = false;
};

async function addAllToCart() {
	isAddAllPending.value = true;
	const { data } = await supabase
		.from("product")
		.select("*")
		.in(
			"id",
			wishlist.value?.data?.map((product) => product.product_id)
		);
	let orderItemsToInsert = data?.map((product) => ({
		product_id: product.id,
		total_quantity: 1,
		title: product.title,
		image: product.detail_images[0],
		price: product.price,
		sku: product.sku,
		size: product.size,
	}));

	const { data: orderItems } = await supabase.from("order_item").select();
	for (const item of orderItemsToInsert) {
		const findItem = orderItems?.find(
			(orderItem) => orderItem.product_id === item.product_id
		);
		if (findItem) {
			orderItemsToInsert = orderItemsToInsert?.filter(
				(item) => item.product_id !== findItem.product_id
			);
		}
	}
	await supabase
		.from("order_item")
		.insert(orderItemsToInsert, { upsert: true });

	await refreshNuxtData();
	isAddAllPending.value = false;
	openCartDrawer();
}
</script>

<style scoped>
.not-allowed {
	cursor: not-allowed;
	opacity: 0.5;
}
.not-allowed2 {
	background: rgb(219, 219, 219) !important;
	color: rgb(104, 104, 104);
	cursor: not-allowed;
}
.top-items {
	display: flex;
	justify-content: space-between;
	color: rgb(151, 151, 151);
	font-weight: 600;
	text-transform: uppercase;
	font-size: 0.75rem;
}
.top-items li:first-child {
	width: 40%;
	text-align: start;
}
.top-items > li:not(:first-child) {
	width: 30%;
}
.top-items > li:last-child {
	text-align: end;
}
.container .button {
	all: unset;
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
	width: 80%;
	text-align: center;
}

h2 {
	font-size: 1.75rem;
}
h3 {
	margin-top: 1rem;
	font-size: 1.25rem;
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
		font-size: 1rem;
	}
	h2 {
		font-size: 1.5rem;
	}
}
@media (max-width: 31.25rem) {
	.container {
		padding-inline: 1rem;
	}
}
p {
	color: rgb(150, 150, 150);
	margin: 0 auto;
	line-height: 1.7;
	margin-bottom: 2rem;
	font-size: 0.93rem;
	max-width: 40rem;
}
header {
	border-bottom: 1px solid #eee;
	margin-top: 5rem;
	padding-bottom: 1rem;
	margin-bottom: 1.75rem;
}
.buttons {
	width: fit-content;
	margin-left: auto;
	align-items: center;
	display: flex;
	gap: 1rem;
	width: 40%;
	height: 45px;
}
.buttons .add {
	background: black;
	padding: 0.75rem 3rem;
	color: white;
	font-weight: bold;
	border: 0;
	width: 50%;
	height: 100%;
}
.buttons .delete {
	background: 0;
	padding: 0.75rem 3rem;
	color: rgb(24, 24, 24);
	font-weight: bold;
	border: 1px solid #dadada;
	width: 50%;
	height: 100%;
}
</style>
