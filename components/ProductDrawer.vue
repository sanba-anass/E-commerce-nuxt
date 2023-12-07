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
						:to="`/shop/${props.product?.title
							.split(' ')
							.join('-')}?page=${1}&id=${props.product?.id}`"
					>
						<NuxtImg
							v-if="product"
							placeholder="images/placeholder.svg"
							loading="lazy"
							:src="
								!switchImage
									? props.product?.preview_images[0]
									: props.product?.preview_images[1]
							"
						/>
					</NuxtLink>
					<div
						@click.self="
							useRouter().push(
								`/shop/${propsproduct?.title
									.split(' ')
									.join('-')}?page=${1}&id=${props.product?.id}`
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
					:to="`/shop/${props.product?.title
						.split(' ')
						.join('-')}?page=${1}&id=${props.product?.id}`"
				>
					{{ props.product?.title }}
				</NuxtLink>
				<p class="price">${{ props.product?.price.toFixed(2) }}</p>
				<Rating class="rating" :rating="props.product?.rating" />
				<p class="description">{{ props.product?.description }}</p>
				<div class="product-option">
					<div class="option">
						<div class="option-title color">
							Color:
							<span class="color-name">{{
								colors[selectedColorIndex as number]?.colorName
							}}</span>
						</div>
					</div>
					<ul class="colors">
						<button
							:class="{
								'color-outline': color.isActive,
								'color-border': color.colorName === 'white',
							}"
							@click="setActiveColor(index)"
							:style="{ background: color.color }"
							v-for="(color, index) in colors"
							class="color"
						></button>
					</ul>
				</div>
				<div class="product-option">
					<div class="option">
						<div class="option-title color">
							Size:
							<span class="color-name">{{
								sizes[selectedSizeIndex as number]?.size
							}}</span>
						</div>
					</div>
					<ul class="sizes">
						<button
							class="size-button"
							@click="setActiveSize(index)"
							:class="{ 'size-outline': size.isActive }"
							v-for="(size, index) in sizes"
						>
							{{ size.size }}
						</button>
					</ul>
				</div>
				<div class="add-to-cart">
					<QuantityConuter
						:productId="props.product?.id"
						v-model:quantity="quantity"
						:isCartItem="false"
						:id="props.product?.id"
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
				<div id="paypal-button-container">
					<div v-if="!user" class="buttons-overlay"></div>
				</div>
				<div class="add-to-wishlist">
					<FavouriteButton
						:colorName="colors[selectedColorIndex as number]?.colorName"
						:size="sizes[selectedSizeIndex as number]?.size"
						:id="favId"
					/>
				</div>
				<div class="category">
					<span>category:</span>{{ props.product?.category }}
				</div>
				<div class="sku"><span>sku:</span>{{ props.product?.sku.trim() }}</div>
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
import { loadScript } from "@paypal/paypal-js";
interface Props {
	product: Object;
}

const props = defineProps<Props>();

const { closeProductDrawer, isDrawerOpen, productId } = useProductDrawer();
const config = useRuntimeConfig();
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
const selectedColorIndex = ref<number | null>(0);
const selectedSizeIndex = ref<number | null>(0);
const colors = ref([
	{ color: "rgb(172,253,47)", colorName: "Green Yellow", isActive: true },
	{ color: "rgb(128,128,128)", colorName: "gray", isActive: false },
	{ color: "rgb(198,132,177)", colorName: "Opera Mauve", isActive: false },
	{ color: "rgb(217,182,154)", colorName: "Tan", isActive: false },
	{ color: "rgb(231,166,72)", colorName: "Indian Yellow", isActive: false },
	{ color: "rgb(255,255,255)", colorName: "white", isActive: false },
	{ color: "rgb(0,0,0)", colorName: "black", isActive: false },
	{ color: "rgb(85,107,47)", colorName: "Olive Green", isActive: false },
	{ color: "rgb(100,149,237)", colorName: "Cornflower Blue", isActive: false },
	{ color: "rgb(36,55,79)", colorName: "Dark Blue", isActive: false },
]);

const sizes = ref([
	{ size: "XS", isActive: true },
	{ size: "S", isActive: false },
	{ size: "M", isActive: false },
	{ size: "L", isActive: false },
	{ size: "XL", isActive: false },
	{ size: "XXL", isActive: false },
	{ size: "X", isActive: false },
]);
function setActiveColor(index: number) {
	selectedColorIndex.value = index;

	colors.value[index].isActive = true;
	colors.value.forEach((_, i) => {
		if (i !== index) {
			colors.value[i].isActive = false;
		}
	});
}
function setActiveSize(index: number) {
	selectedSizeIndex.value = index;

	sizes.value[index].isActive = true;
	sizes.value.forEach((_, i) => {
		if (i !== index) {
			sizes.value[i].isActive = false;
		}
	});
}
async function addOrderItem() {
	if (!user.value) {
		closeProductDrawer();
		openDialog("info", "please login to perform this action");
		return;
	}
	if (
		!sizes.value[selectedSizeIndex.value]?.size ||
		!colors.value[selectedColorIndex.value]?.colorName
	) {
		alert("please select a size and a color!");
		return;
	}

	pending.value = true;
	const { data: orderItems } = await supabase.from("order_item").select("*");

	const productToInserted = computed(() =>
		orderItems?.find(
			(item: any) =>
				item.product_id === productId.value?.toString() &&
				item.color_name === colors.value[selectedColorIndex.value]?.colorName &&
				item.size === sizes.value[selectedSizeIndex.value]?.size
		)
	);

	if (productToInserted.value) {
		const { data: order } = await supabase
			.from("order_item")
			.select("total_quantity")
			.eq("color_name", productToInserted.value.color_name)
			.eq("size", productToInserted.value.size);
		const total_quantity =
			parseInt(order![0].total_quantity) + parseInt(quantity.value);
		await supabase
			.from("order_item")
			//@ts-ignore
			.update({
				total_quantity: total_quantity,
			})
			.eq("color_name", productToInserted.value.color_name)
			.eq("size", productToInserted.value.size);

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
		size: sizes.value[selectedSizeIndex.value]?.size,
		color_name: colors.value[selectedColorIndex.value]?.colorName,
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
	await refreshNuxtData();
	pending.value = false;
	closeProductDrawer();
}
const router = useRouter();

const init = ref(false);
onBeforeMount(async () => {
	try {
		const paypal = await loadScript({
			clientId: config.public.paypalClientId,
		});

		await paypal
			.Buttons({
				createOrder: async (data, actions) => {
					if (
						!sizes.value[selectedSizeIndex.value]?.size ||
						!colors.value[selectedColorIndex.value]?.colorName
					) {
						alert("please select a size and a color!");
						return;
					}
					if (user.value) {
						const { data: currentOrder } = await supabase
							.from("product")
							.select("*")
							.eq("id", props.product.id);
						const res = await $fetch("/api/create-paypal-order", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: [
								{
									title: currentOrder[0]?.title,
									sku: currentOrder[0]?.sku,
									category: currentOrder[0]?.category,
									price: currentOrder[0]?.price,
									total_quantity: quantity.value,
								},
							],
						});
						return res.id;
					} else {
						openDialog("info", "please login to perform this action");
						throw new Error("user does not exist");
					}
				},
				onApprove: function (data, actions) {
					return actions.order.capture().then((orderData) => {
						closeProductDrawer();
						router.push("/success");
					});
				},
				style: {
					// Adapt to your needs
					layout: "vertical",
					color: "gold",
					shape: "rect",
					label: "paypal",
				},
				// The following is optional and you can
				// limit the buttons to those you want to
				// provide
			})
			.render("#paypal-button-container");
	} catch (error) {
		// Add proper error handling
		console.error(error);
	}
});
</script>
<style scoped>
.color-border {
	border: 1px solid rgb(194, 194, 194) !important;
}
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
#paypal-button-container {
	margin-top: 1.5rem;
	position: relative;
}
.buttons-overlay {
	height: calc(100% - 2.5rem);
	cursor: not-allowed;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 999;
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
.product-options .option {
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-items: center;
}
.product-options {
	margin-bottom: 1.25rem;
}
.product-options .details {
	text-align: start;
	width: 75%;
	font-size: 0.85rem;
	display: flex;
	flex-wrap: wrap;
}
.product-option .colors {
	display: flex;
	gap: 1rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
	width: 20rem;
}
.product-option .colors .color {
	background-color: rgb(231, 231, 231);
	width: 1.85rem;
	height: 1.85rem;
	border-radius: 50%;
	border: 0;
}
.sizes {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	margin-bottom: 2rem;
}
.product-option .sizes .size-button {
	border: 1px solid rgb(231, 231, 231);
	width: 1.85rem;
	height: 1.85rem;
	border-radius: 50%;
	background: 0;
	font-size: 0.75rem;
}
.size-outline {
	border: 1px solid black !important;
}

.option-title.color {
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
	margin-bottom: 1.5rem;
}
.option-title.color .color-name {
	color: black;
	font-weight: 500;
}
.product-options .details {
	font-weight: 700;
}
.product-options .option .option-title {
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
}
/* .product-options .option a {
	margin-right: 0.5rem;
	color: rgb(158, 158, 158);
	font-weight: 400;

	text-decoration: none;
}
.product-options .option a:hover {
	text-decoration: underline;
	color: rgb(34, 34, 34);
} */
.product-options.last {
	margin-bottom: 3rem;
}

.color-outline {
	outline: 1px solid rgb(158, 158, 158);
	outline-offset: 0.15rem;
}
</style>
