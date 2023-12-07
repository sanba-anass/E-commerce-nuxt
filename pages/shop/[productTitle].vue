<template>
	<div class="container">
		<div class="product">
			<div class="product-images">
				<div class="big-images">
					<NuxtImg
						:class="{ isSelectingImg }"
						v-for="_ in productImagesDetail"
						:src="ImgSrc"
						loading="lazy"
					/>
				</div>
				<div class="small-images">
					<div
						:class="{ isActiveImg: image.isActive }"
						v-for="(image, index) in productImagesDetail"
						class="small-img"
					>
						<NuxtImg
							loading="lazy"
							:src="image.url"
							@click="setActiveImg(index)"
						/>
					</div>
				</div>
			</div>
			<div class="product-details">
				<div class="title-wrapper">
					<h1 class="title">{{ currentProduct.data[0]?.title }}</h1>
				</div>
				<div class="review-flex">
					<p class="price">${{ currentProduct.data[0]?.price.toFixed(2) }}</p>
					<Rating :rating="currentProduct.data[0]?.rating" />
				</div>
				<p class="description">{{ currentProduct.data[0]?.description }}</p>

				<div class="product-options">
					<div class="option">
						<div class="option-title">sku:</div>
						<div class="details">
							{{ currentProduct.data[0]?.sku }}
						</div>
					</div>
				</div>
				<div class="product-options last">
					<div class="option">
						<div class="option-title">category:</div>
						<div class="details">
							{{ currentProduct.data[0]?.category }}
						</div>
					</div>
				</div>

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

				<div class="quantity">quantity:</div>
				<div class="quantity-details">
					<QuantityConuter
						:productId="currentProduct.data[0]?.id"
						:width="8"
						:height="3"
						v-model:quantity="quantity"
						:isCartItem="false"
						:id="currentProduct.data[0]?.id"
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

				<div class="payment-title">guaranted safe checkout:</div>
				<NuxtImg
					class="payment-providers"
					src="images/payment-providers.webp"
				/>
				<div class="add-to-wishlist">
					<FavouriteButton
						:colorName="colors[selectedColorIndex as number]?.colorName"
						:id="currentProduct.data[0]?.id"
						:size="sizes[selectedSizeIndex as number]?.size"
					/>
				</div>
				<div class="social-section">
					<div class="share">share:</div>
					<div class="social-links">
						<NuxtLink>
							<FacebookIcon />
							<div class="text">share</div></NuxtLink
						>
						<NuxtLink>
							<TwitterIcon />
							<div class="text">tweet</div>
						</NuxtLink>
						<NuxtLink>
							<PinterestIcon />
							<div class="text">pin it</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.color-border {
	border: 1px solid rgb(194, 194, 194) !important;
}

#paypal-button-container {
	margin-top: 1.5rem;
	position: relative;
}
.buttons-overlay {
	height: calc(100% - 2.7rem);
	cursor: not-allowed;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 999;
}
.social-links {
	display: flex;
	align-items: center;
	gap: 2rem;
	flex-wrap: wrap;
}
.social-section {
	margin-top: 3rem;
	align-items: center;
	gap: 6.5rem;
}
button:disabled {
	background: rgb(219, 219, 219);
	color: rgb(104, 104, 104);
	cursor: not-allowed;
}
.review-flex {
	display: flex;
	align-items: center;
	margin-bottom: 1.75rem;
	gap: 1rem;
}
.social-section .text {
	margin-left: 0.5rem;
	font-size: 0.9rem;
}
.share {
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
	margin-bottom: 2rem;
}
.social-links span {
	font-size: 0.8rem;
	display: block;
}
.social-links a {
	display: flex;
	cursor: pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.add-to-wishlist {
	margin-top: 3rem;
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

.payment-providers {
	width: 25rem;
	margin-top: 1.25rem;
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
.quantity-details {
	display: flex;
	gap: 1rem;
}

.notes {
	margin-bottom: 0.5rem;
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
	margin-top: 3rem;
}
.payment-title {
	margin-bottom: 0.5rem;
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
	margin-top: 3rem;
}

.quantity {
	margin-bottom: 0.5rem;
	font-weight: 700;
	font-size: 0.7rem;
	color: rgb(87, 87, 87);
	text-transform: uppercase;
	margin-top: 3rem;
}
textarea {
	width: 100%;
	background-color: rgb(247, 247, 247);
	border: 1px solid rgb(219, 219, 219);
	padding: 0.75rem;
	min-height: 8rem;
}
textarea:focus {
	outline: none;
	background-color: rgb(255, 255, 255);
}

.product {
	display: flex;
	gap: 4.5rem;
}
@media (max-width: 58.125rem) {
	.product {
		flex-direction: column;
		align-items: center;
	}
}
.container {
	max-width: 105rem;
	width: 95%;
	margin: 0 auto;
	margin-top: 5rem;
}
.product-images {
	width: 50%;
}
@media (max-width: 58.125rem) {
	.product-images {
		width: 90%;
	}
}
.big-images {
	margin-bottom: 2rem;
	display: flex;
	overflow: hidden;
}
.big-images > * {
	flex-shrink: 0;
	transition: 0.3s;
	cursor: zoom-in;
}
.big-images > *:hover {
	transform: scale(1.2);
}
.big-images img {
	width: 100%;
}

.small-images {
	display: flex;
	gap: 1.25rem;
}
.small-img {
	cursor: pointer;
	transition: opacity 300ms;
	opacity: 0.5;
	width: 120px;
	height: 150px;
}
.small-img img {
	width: 100%;
	max-height: 100%;
}
.product-details {
	width: 50%;
}
@media (max-width: 58.125em) {
	.product-details {
		width: 90%;
	}
}
@media (max-width: 34.375em) {
	.product-images {
		width: 100%;
	}
	.product-details {
		width: 95%;
	}
}
.title-wrapper {
	margin-bottom: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product-details .title {
	font-size: 1.75rem;
}
@media (max-width: 34.375em) {
	.product-details .title {
		font-size: 1.6rem;
	}
}
.product-details .price {
	font-size: 1.4rem;
	font-weight: 800;
}
.product-details .description {
	font-size: 0.95rem;
	line-height: 1.8;
	color: rgb(148, 148, 148);
	margin-bottom: 2rem;
}

.isActiveImg {
	opacity: 1;
}
.small-img:hover {
	opacity: 1;
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
	max-width: 20rem;
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
	max-width: 20rem;
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
.product-options .option a {
	margin-right: 0.5rem;
	color: rgb(158, 158, 158);
	font-weight: 400;

	text-decoration: none;
}
.product-options .option a:hover {
	text-decoration: underline;
	color: rgb(34, 34, 34);
}
.product-options.last {
	margin-bottom: 3rem;
}

.color-outline {
	outline: 1px solid rgb(158, 158, 158);
	outline-offset: 0.15rem;
}

.isSelectingImg {
	animation: slideIn 0.5s;
}
@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(0);
	}
	60% {
		opacity: 0;
	}
	to {
		transform: translateX(-100%);
		opacity: 1;
	}
}
</style>

<script setup lang="ts">
const route = useRoute();

const isSelectingImg = ref(false);
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

const queryId: string = route.query.id as string;

const supabase = useSupabaseClient();
const { open } = useToast(30);

const { data: currentProduct } = await useAsyncData(async () => {
	return await supabase.from("product").select("*").eq("id", queryId);
}, {});

if (!currentProduct.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
		fatal: true,
	});
}
const productImagesDetail = ref(
	//@ts-ignore
	currentProduct.value.data[0].detail_images.map(
		(url: string, index: number) => {
			return {
				url,
				isActive: !Boolean(index),
			};
		}
	)
);
const quantity = ref(1);
let id: NodeJS.Timeout;
const ImgSrc = ref(productImagesDetail.value[0].url);
const setActiveImg = (index: number) => {
	productImagesDetail.value[index].isActive = true;

	ImgSrc.value = productImagesDetail.value[index].url;

	isSelectingImg.value = productImagesDetail.value[index].isActive;

	id = setTimeout(() => {
		isSelectingImg.value = false;
	}, 500);
	productImagesDetail.value.forEach((_: any, i: number) => {
		if (index !== i) {
			productImagesDetail.value[i].isActive = false;
		}
	});
};
const pending = useAddCartPending();
const { toastId, isFavouriteItem } = useToast(30);
const { openDialog } = useDialog();
const user = useSupabaseUser();
async function addOrderItem() {
	if (!user.value) {
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

	const productToInserted = orderItems?.find(
		(item: any) =>
			item.product_id === queryId &&
			item.color_name === colors.value[selectedColorIndex.value]?.colorName &&
			item.size === sizes.value[selectedSizeIndex.value]?.size
	);

	if (productToInserted) {
		const { data: order } = await supabase
			.from("order_item")
			.select("total_quantity")
			.eq("color_name", productToInserted.color_name)
			.eq("size", productToInserted.size);
		const total_quantity =
			parseInt(order![0].total_quantity) + parseInt(quantity.value);
		await supabase
			.from("order_item")
			//@ts-ignore
			.update({
				total_quantity: total_quantity,
			})
			.eq("color_name", productToInserted.color_name)
			.eq("size", productToInserted.size);

		await refreshNuxtData();
		pending.value = false;

		return;
	}
	open();
	const { data: currentProduct } = await supabase
		.from("product")
		.select("*")
		.eq("id", queryId);

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

	await refreshNuxtData();
	pending.value = false;
}
import { CreateOrderActions, loadScript } from "@paypal/paypal-js";
const config = useRuntimeConfig();
const router = useRouter();
const { data: currentOrder } = await supabase
	.from("product")
	.select("*")
	.eq("id", queryId);
console.log("currectOrder", currentOrder);
onBeforeMount(async () => {
	try {
		const paypal = await loadScript({
			clientId: config.public.paypalClientId,
		});

		await paypal
			.Buttons({
				createOrder: async (data, actions: CreateOrderActions) => {
					if (
						!sizes.value[selectedSizeIndex.value]?.size ||
						!colors.value[selectedColorIndex.value]?.colorName
					) {
						alert("please select a size and a color!");
						return;
					}
					try {
						if (user.value) {
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
					} catch (e) {
						console.log(e.message);
					}
				},
				onApprove: function (data, actions) {
					return actions.order.capture().then((orderData) => {
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
onUnmounted(() => {
	clearTimeout(id);
});
</script>
