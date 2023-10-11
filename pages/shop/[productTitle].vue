<template>
	<div class="container">
		<div class="product">
			<div class="product-images">
				<div class="big-images">
					<NuxtImg
						:class="{ isSelectingImg }"
						v-for="_ in productImagesDetail"
						:src="ImgSrc"
					/>
				</div>
				<div class="small-images">
					<NuxtImg
						class="small-img"
						v-for="(image, index) in productImagesDetail"
						:src="image.url"
						:class="{ isActiveImg: image.isActive }"
						@click="setActiveImg(index)"
					/>
				</div>
			</div>
			<div class="product-details">
				<h1 class="title">{{ currentProduct.data[0]?.title }}</h1>
				<p class="price">${{ currentProduct.data[0]?.price.toFixed(2) }}</p>
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
					<div class="quantity-counter">
						<button @click="decreaseQuantity">
							<MinusIcon />
						</button>

						<input
							@keydown="onkeydown"
							@input="updateQuantityViaInput"
							min="1"
							:disabled="disabled"
							:value="currentProduct.data[0]?.quantity"
							type="number"
							class="quantity-input"
						/>
						<button @click="increaseQuantity"><PlusIcon /></button>
					</div>
					<div class="add-to-bag-button">Add To Bag</div>
				</div>
				<button class="paypal-button">
					<span class="paypal-button-title"> Buy with </span>
					<span class="paypal-logo"> <i>Pay</i><i>Pal</i> </span>
				</button>
				<div class="payment-title">guaranted safe checkout:</div>
				<NuxtImg
					class="payment-providers"
					src="images/payment-providers.webp"
				/>
				<div class="add-to-wishlist">
					<FavouriteButton :id="currentProduct.data[0]?.id" />

					<NuxtLink> add to wishlist</NuxtLink>
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
	margin-top: 5rem;
	align-items: center;
	gap: 6.5rem;
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
.paypal .logo {
	font-family: Verdana, Tahoma;
	font-weight: bold;
	font-size: 26px;
}
i:first-child {
	color: #253b80;
	font-weight: 800;
}

i:last-child {
	color: #179bd7;
	font-weight: 800;
}

.paypal-button {
	padding: 15px 30px;
	background: #f9b5216e;
	margin: 0 auto;
	display: block;
	min-width: 138px;
	position: relative;
	margin-top: 0.5rem;
	width: 100%;
	border: 0;
	transition: 0.3s;
}
.payment-providers {
	width: 25rem;
	margin-top: 1.25rem;
}
.paypal-button:hover {
	background: #ffbb27;
}
.paypal-logo {
	display: inline-block;
	font-size: 1.15rem;
}
.paypal-button-title {
	font-size: 14px;
	color: #000000;
	vertical-align: baseline;
	font-weight: 800;
	text-transform: uppercase;
	font-size: 0.85rem;
}
.quantity-details {
	display: flex;
	gap: 1rem;
}
.quantity-input {
	width: 3rem;
	background-color: rgb(247, 247, 247);
	border: 1px solid rgb(219, 219, 219);
	font-size: 1.2rem;
	text-align: center;
	border-inline: 0;
}
.add-to-bag-button {
	background-color: black;
	color: white;
	text-align: center;
	padding-block: 1rem;
	cursor: pointer;
	width: 100%;
}
.quantity-input:focus {
	outline: none;
}
.quantity-counter {
	display: flex;
}
.quantity-counter button {
	align-self: stretch;
	padding: 0.8rem 0.25rem;
	background: none;
	border: 1px solid #eee;
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
	gap: 1rem;
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
.product-details .title {
	font-size: 1.75rem;
	margin-bottom: 1.5rem;
}
@media (max-width: 34.375em) {
	.product-details .title {
		font-size: 1.6rem;
	}
}
.product-details .price {
	font-size: 1.4rem;
	font-weight: 800;
	margin-bottom: 1.75rem;
}
.product-details .description {
	font-size: 0.95rem;
	line-height: 1.8;
	color: rgb(148, 148, 148);
	margin-bottom: 2rem;
}

.small-img {
	flex: 1;
	width: 16%;
	cursor: pointer;
	transition: opacity 300ms;
	opacity: 0.5;
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
const disabled = ref(true);
const isSelectingImg = ref(false);

const queryId: string = route.query.id as string;


const supabase = useSupabaseClient();

const { data: currentProduct } = await useAsyncData(async () => {
	return await supabase.from("product").select("*").eq("id", queryId);
});

console.log(currentProduct.value);

if (!currentProduct.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
	});
}
const quantity = ref(currentProduct.value.data[0]?.quantity);

async function updateQuantity(action: "increase" | "decrease") {
	const id = currentProduct.value.data[0]?.id;
	//@ts-ignore
	action === "increase" ? quantity.value++ : quantity.value--;
	//@ts-ignore
	await supabase
		.from("product")
		//@ts-ignore

		.update({
			quantity: quantity.value,
		})
		.eq("id", id);
	await refreshNuxtData();
}
async function increaseQuantity() {
	await updateQuantity("increase");
}
async function decreaseQuantity() {
	//@ts-ignore
	if (currentProduct.value.data[0]?.quantity === 1) {
		return;
	}
	await updateQuantity("decrease");
}
onMounted(() => {
	disabled.value = false;
});

async function updateQuantityViaInput(event: Event) {
	const eventTarget = event?.target as HTMLInputElement;
	if (eventTarget?.value === "0") {
		eventTarget.value = eventTarget.value.replace(/^0+/, "");
		return;
	}
	//@ts-ignore
	const id = currentProduct.value.data[0]?.id;
	quantity.value = eventTarget.value;
	await supabase
		.from("product")
		//@ts-ignore

		.update({
			quantity: quantity.value,
		})
		.eq("id", id);
}
function onkeydown(event: Event) {
	const invalidChars = ["-", "+", "e"];

	if (invalidChars.includes((event as KeyboardEvent).key)) {
		event.preventDefault();
	}
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
let id: any;
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
	window.scrollTo(0,0)
};

// const updateIsFavourite = async (id: string) => {
// 	console.log(currentProduct.value.data[0]?.isFavourite);
// 	await supabase
// 		.from("product")
// 		.update({
// 			isFavourite: !currentProduct.value.data[0]?.isFavourite,
// 		})
// 		.eq("id", id);

// 	await refreshNuxtData();
// };
onUnmounted(() => {
	clearTimeout(id);
});

</script>
