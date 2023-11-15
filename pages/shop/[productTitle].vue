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
						<div class="option-title">tags:</div>
						<div class="details">
							<NuxtLink
								to="/shop"
								v-for="tag in currentProduct.data[0]?.tags"
								>{{ tag + "," }}</NuxtLink
							>
						</div>
					</div>
				</div>
				<div class="product-options">
					<div class="option">
						<div class="option-title">sku:</div>
						<div class="details">
							{{ currentProduct.data[0]?.sku }}
						</div>
					</div>
				</div>
				<div class="product-options">
					<div class="option">
						<div class="option-title">category:</div>
						<div class="details">
							{{ currentProduct.data[0]?.category }}
						</div>
					</div>
				</div>
				<div class="notes">Notes</div>
				<textarea placeholder="Write here your notes for the order"></textarea>
				<div class="quantity">quantity:</div>
				<div class="quantity-details">
					<QuantityConuter
						:productId="currentProduct.data[0]?.id"
						:width="8"
						:height="3"
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

				<div class="payment-title">guaranted safe checkout:</div>
				<NuxtImg
					class="payment-providers"
					src="images/payment-providers.webp"
				/>
				<div class="add-to-wishlist">
					<FavouriteButton :id="currentProduct.data[0]?.id" />
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
.title-wrapper .add-to-wishlist {
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
const { openCartDrawer } = useOpenCartDrawer();
const pending = useAddCartPending();
const { toastId, isFavouriteItem } = useToast(30);
const { openDialog } = useDialog();
const user = useSupabaseUser();
async function addOrderItem() {
	if (!user.value) {
		openDialog("info", "please login to perform this action");

		return;
	}
	pending.value = true;

	const { data: orderItems } = await supabase.from("order_item").select("*");

	const productToInserted = orderItems?.find(
		(item: any) => item.product_id === queryId.toString()
	);
	console.log(orderItems);
	console.log("productToInserted:", productToInserted);

	if (productToInserted) {
		const { data: order } = await supabase
			.from("order_item")
			.select("total_quantity")
			.eq("product_id", productToInserted.product_id);
		const total_quantity =
			parseInt(order![0].total_quantity) + parseInt(quantity.value);
		await supabase
			.from("order_item")
			//@ts-ignore
			.update({
				total_quantity: total_quantity,
			})
			.eq("product_id", productToInserted.product_id);

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
		size: currentProduct[0].size,
	});
	const { data: orderItems2 } = await supabase.from("order_item").select("*");
	const total = orderItems2?.reduce(
		(total, item) => item.total_quantity * item.price + total,
		0
	);
	console.log(total);

	await supabase.from("order").insert({
		total_order_price: total,
	});
	console.log(currentProduct);
	await refreshNuxtData();
	pending.value = false;
}
onUnmounted(() => {
	clearTimeout(id);
});
</script>
