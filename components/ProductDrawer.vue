<template>
	<div :class="{ open: isDrawerOpen }" class="cart-drawer">
		<div ref="drawerContentRef" class="content">
			<header>
				<button class="close" @click="closeProductDrawer">
					<CloseIcon :color="'black'" />
				</button>
			</header>
			<main class="cart-content">
				<div
					class="images"
					@mouseleave="switchImage = false"
					@mouseenter="switchImage = true"
				>
					<NuxtLink
						@click="closeProductDrawer()"
						:to="`/shop/${product?.title.split(' ').join('-')}?page=${1}&id=${
							product?.id
						}`"
					>
						<NuxtImg
							v-if="product"
							placeholder="images/placeholder.svg"
							loading="lazy"
							:src="
								!switchImage
									? product?.preview_images[0]
									: product?.preview_images[1]
							"
						/>
					</NuxtLink>
					<div
						@click.self="
							useRouter().push(
								`/shop/${product?.title.split(' ').join('-')}?page=${1}&id=${
									product?.id
								}`
							);
							closeProductDrawer();
						"
						class="arrows"
					>
						<button @click="switchSliderItemImage" class="left-arrow">
							<LeftArrow />
						</button>
						<button @click="switchSliderItemImage" class="right-arrow">
							<RightArrow />
						</button>
					</div>
				</div>
				<NuxtLink
					@click="closeProductDrawer()"
					class="title"
					:to="`/shop/${product?.title.split(' ').join('-')}?page=${1}&id=${
						product?.id
					}`"
				>
					{{ product?.title }}
				</NuxtLink>
				<p class="price">${{ product?.price.toFixed(2) }}</p>
				<Rating class="rating" :rating="product?.rating" />
				<p class="description">{{ product?.description }}</p>
				<div class="add-to-cart">
					<QuantityConuter
						:productId="product?.id"
						v-model:quantity="quantity"
						:isCartItem="false"
					/>
					<button
						:disabled="pending"
						@click="addOrderItem"
						class="add-to-bag-button"
					>
						<Spinner v-if="pending" />
						<div v-else>Add to Bag</div>
					</button>
				</div>
				<PayPalButton />
				<div class="add-to-wishlist">
					<FavouriteButton :id="favId" />

					<NuxtLink> add to wishlist</NuxtLink>
				</div>
				<div class="category">
					<span>category:</span>{{ product?.category }}
				</div>
				<div class="sku"><span>sku:</span>{{ product?.sku.trim() }}</div>
				<div class="share">
					<div class="text">share:</div>
					<div class="icons">
						<PinterestIcon />
						<FacebookIcon />
						<TwitterIcon />
					</div>
				</div>
			</main>
		</div>
	</div>
</template>
<script setup lang="ts">
interface Props {
	product: Object;
}

const { product } = defineProps<Props>();

const { closeProductDrawer, isDrawerOpen, productId } = useProductDrawer();
const { favId } = useProductDrawer();
const switchImage = ref(false);
const { drawerContentRef } = useScrollToTop();
const quantity = ref(1);
function switchSliderItemImage() {
	switchImage.value = !switchImage.value;
}

const pending = useAddCartPending();
const supabase = useSupabaseClient();
const { toastId, isFavouriteItem, open } = useToast(30);
const { openDialog } = useDialog();
const user = useSupabaseUser();
async function addOrderItem() {
	if (!user.value) {
		closeProductDrawer();
		openDialog("info", "please login to perform this action");
		return;
	}
	pending.value = true;

	const { data: orderItems } = await supabase.from("order_item").select("*");

	const productToInserted = computed(() =>
		orderItems?.find(
			(item: any) => item.product_id === productId.value?.toString()
		)
	);

	if (productToInserted.value) {
		const { data: order } = await supabase
			.from("order_item")
			.select("total_quantity")
			.eq("product_id", productToInserted.value.product_id);
		const total_quantity =
			parseInt(order![0].total_quantity) + parseInt(quantity.value);
		await supabase
			.from("order_item")
			//@ts-ignore
			.update({
				total_quantity: total_quantity,
			})
			.eq("product_id", productToInserted.value.product_id);

		await refreshNuxtData();
		pending.value = false;
		closeProductDrawer();
		return;
	}
	open();
	const { data: currentProduct } = await supabase
		.from("product")
		.select("*")
		.eq("id", productId.value);

	//@ts-ignore

	isFavouriteItem.value = false;
	toastId.value = currentProduct[0].id;
	await supabase.from("order_item").insert({
		product_id: currentProduct[0].id,
		total_quantity: quantity.value,
		title: currentProduct[0].title,
		image: currentProduct[0].detail_images[0],
		price: currentProduct[0].price,
		sku: currentProduct[0].sku,
		size: currentProduct[0].size,
	});
	const { data: orderItems2 } = await supabase.from("order_item").select("*");
	const total = orderItems2?.reduce(
		(total, item) => item.total_quantity * item.price + total,
		0
	);
	console.log(total);

	// await supabase.from("order").insert({
	// 	total_order_price: total,
	// });
	console.log(currentProduct);
	await refreshNuxtData();
	pending.value = false;
	closeProductDrawer();
}
</script>
<style scoped>
.cart-content {
	padding: 1rem;
}
.content {
	height: 100vh;
	overflow-y: auto;
}
.cart-drawer {
	box-shadow: 6px 0px 15px rgba(0, 0, 0, 0.425);
	height: 100vh;
	top: 0;
	width: 25rem;
	transform: translateX(100%);
	background-color: #ffffff;
	transition-timing-function: ease-in-out;
	position: fixed;
	right: 0;
	z-index: 9999999999999999;
	transition: 0.5s transform;
}
header {
	padding: 1rem 1.5rem;
	position: sticky;
	z-index: 99999999999999999;
	top: 0;
	background-color: white;
	border-bottom: 1px solid rgb(236, 236, 236);
	margin-bottom: 1rem;
}
button {
	display: flex;
	align-items: center;
	justify-content: center;
	background: 0;
	border: 0;
}
button.close {
	margin-left: auto;
}
@media (max-width: 26.3125em) {
	.cart-drawer {
		width: 85%;
	}
}
.open {
	transform: translateX(0%);
	overflow: hidden;
}
.images {
	position: relative;
	margin-bottom: 1rem;
}
.arrows {
	position: absolute;
	width: 100%;
	top: 50%;
	transform: translateY(-50%);
	padding: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
}
.arrows .left-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(-1rem);
	background: 0;
	border: 0;
	background-color: rgba(189, 189, 189, 0.493);
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
}
.images:hover:hover .left-arrow {
	opacity: 1;
	transform: translateX(0);
}
.arrows .right-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(1rem);
	border: 0;
	width: 1.5rem;
	height: 1.5rem;
	background-color: rgba(189, 189, 189, 0.493);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}
.images:hover .right-arrow {
	opacity: 1;
	transform: translateX(0);
}
img {
	width: 100%;
	display: block;
	cursor: pointer;
}
.title {
	font-weight: 700;
	text-decoration: none;
	font-size: 1.3rem;
	margin-bottom: 1rem;
	display: inline-block;
}
.title:hover {
	text-decoration: underline;
}
.price {
	font-size: 1.25rem;
	color: rgb(192, 136, 62);
	margin-bottom: 1rem;
	font-weight: 600;
}
.rating {
	margin-bottom: 1rem;
}
.description {
	line-height: 1.7;
	color: rgb(107, 107, 107);
	font-size: 0.95rem;
	margin-bottom: 2rem;
}
.add-to-cart {
	display: flex;
	align-items: center;
	gap: 1rem;
}
.add-to-bag-button {
	background-color: black;
	color: white;
	text-align: center;
	padding-block: 1rem;
	cursor: pointer;
	width: 100%;
	font-weight: bold;
	border: 0;
}
button:disabled {
	background: rgb(219, 219, 219);
	color: rgb(104, 104, 104);
	cursor: not-allowed;
}
.add-to-wishlist {
	margin-block: 3rem;
	align-items: center;
	display: flex;
	gap: 1rem;
}
.add-to-wishlist * {
	position: static;
	opacity: 1;
}
.add-to-wishlist button {
	background: 0;
	border: 0;
	display: flex;
	align-items: center;
	justify-self: center;
}

.add-to-wishlist a {
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	font-size: 0.85rem;
}
.add-to-wishlist a:hover {
	text-decoration: underline;
}
.category {
	font-size: 1rem;
	margin-bottom: 1rem;
	font-weight: 700;
}
.sku {
	font-weight: 700;
	font-size: 1rem;
	margin-bottom: 1rem;
}
.category span {
	color: rgb(163, 163, 163);
	margin-right: 0.5rem;
	font-weight: normal;
}
.sku span {
	color: rgb(163, 163, 163);
	margin-right: 0.5rem;
	font-weight: normal;
}
.share {
	display: flex;
	margin-bottom: 1rem;
}
.share .text {
	color: rgb(163, 163, 163);
	margin-right: 0.5rem;
	font-weight: normal;
	font-size: 1rem;
}
.share .icons {
	display: flex;
	gap: 1rem;
}
.share .icons > * {
	width: 1.5rem;
}
</style>
