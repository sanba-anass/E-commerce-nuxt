<template>
	<div class="container">
		<h2>SHOPPING CART</h2>
		<EmptyCart v-if="orderItems?.data?.length === 0" />
		<main v-else class="cart-content">
			<div class="items">
				<header class="header1">
					<ul>
						<li class="product">Product</li>
						<div class="last-3">
							<li>Price</li>
							<li>qty</li>
							<li>total</li>
						</div>
					</ul>
				</header>
				<ul class="cart-items">
					<CartItem
						v-for="item in orderItems.data"
						:productId="item.product_id"
						:totalQuantity="item.total_quantity"
						:title="item.title"
						:price="item.price"
						:key="item.id"
						:image="item.image"
						:sku="item.sku"
						:size="item.size"
						:id="item.id"
						:colorName="item.color_name"
					/>
				</ul>
				<div class="buttons">
					<NuxtLink @click="createCheckOutSession" class="checkout"
						>Procced To Checkout</NuxtLink
					>
					<NuxtLink to="/shop?page=1" class="shopping"
						>Continue Shopping</NuxtLink
					>
				</div>
			</div>
			<div class="pay">
				<header class="header2">THERE ARE 51 ITEMS IN YOUR CART</header>

				<div class="pay-card">
					<div class="text1">
						<div class="title">TOTAL:</div>
						<div v-if="!pending" class="total-price-all-order-items">
							${{ allOrderItemsTotalPrice?.toFixed(2) }}
						</div>
						<Spinner class="m0" v-else />
					</div>
					<div class="text2">
						<div class="title">SHIPPING:</div>
						<div class="shipping-message">
							Shipping & taxes calculated at checkout
						</div>
					</div>
					<div
						v-if="allOrderItemsTotalPrice!>=500"
						class="free-shipping-message"
					>
						CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!
					</div>
					<div class="spend-message" v-else>
						SPEND
						<span>${{ priceRemainForFreeShipping }}</span> FOR FREE SHIPPING
					</div>
					<div class="free-shipping-message2">
						Free shipping for any orders above <span>$500.00</span>
					</div>
					<div class="shipping-input">
						<label for="note">ADD A NOTE TO YOUR ORDER : </label>
						<textarea placeholder="add your note here"></textarea>
					</div>
				</div>
				<!-- <PayPalButton @click="requestPaypalOrder" /> -->

				<div id="paypal-button-container"></div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { loadScript } from "@paypal/paypal-js";
const config = useRuntimeConfig();
const router = useRouter();
const { allowPageAccess } = useSuccessPage();

onBeforeMount(async () => {
	try {
		const paypal = await loadScript({
			clientId: config.public.paypalClientId,
		});

		await paypal
			.Buttons({
				createOrder: async (data, actions) => {
					const res = await $fetch("/api/create-paypal-order", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: orderItems.value?.data,
					});
					return res.id;
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

const supabase = useSupabaseClient();

const { data: orderItems, pending } = await useAsyncData(
	async () =>
		await supabase
			.from("order_item")
			.select("*")
			.order("created_at", { ascending: false })
);
const allOrderItemsTotalPrice = computed(() =>
	orderItems.value?.data.reduce(
		(accumulator, order) => accumulator + order.total_quantity * order.price,
		0
	)
);
const priceForFreeShipping = 500.0;
const priceRemainForFreeShipping = computed(() =>
	(priceForFreeShipping - allOrderItemsTotalPrice?.value!).toFixed(2)
);

async function createCheckOutSession() {
	const { sessionUrl } = await $fetch<{ sessionUrl: string }>(
		"/api/create-checkout-session",
		{
			method: "POST",
			body: orderItems.value?.data,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	await navigateTo(sessionUrl, { external: true, redirectCode: 303 });
}
</script>

<style scoped>
#paypal-button-container {
	margin-top: 1.5rem;
	border-radius: 0 !important;
}

.header1 {
	background-color: rgb(243, 243, 243);
	padding-block: 1rem;
	border: 1px solid #e0e0e0;
}
@media (max-width: 53.125em) {
	.header1 .product:first-child {
		display: none;
	}
	.header1 ul {
		padding-inline: 1rem;
	}
}
h2 {
	text-align: center;
	margin-top: 4rem;
}
.container {
	max-width: 105rem;
	width: 93%;
	margin: 0 auto;
}
.cart-content {
	margin-top: 3rem;
	display: flex;
	gap: 1rem;
}
@media (max-width: 71.875em) {
	.cart-content {
		flex-direction: column;
		gap: 3rem;
		width: 100%;
	}
}
.items {
	width: 70%;
}
@media (max-width: 71.875em) {
	.items {
		width: 100%;
	}
}
.items .header1 ul li {
	text-align: center;
}
.items .header1 ul {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-inline: 2rem;
}
@media (max-width: 53.125em) {
	.items .header1 ul {
		padding-inline: 1rem;
	}
}
.items .header1 ul li {
	font-weight: 700;
	text-transform: uppercase;
	font-size: 0.75rem;
}
.last-3 {
	display: flex;
	justify-content: space-between;
	width: 50%;
}
@media (max-width: 53.125em) {
	.last-3 {
		width: 100%;
	}
}
.buttons {
	gap: 1.5rem;
	display: flex;
}
@media (max-width: 26.875em) {
	.buttons {
		flex-direction: column;
		gap: 1rem;
	}
	.buttons > * {
		width: 100% !important;
	}
}

.checkout {
	background: black;
	width: 50%;
	margin: 0 auto;
	font-size: 0.95rem;
	color: rgb(255, 255, 255);
	display: inline-block;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
	font-weight: 700;
	padding-block: 0.85rem;
}
.shopping {
	border: 1px solid rgb(179, 179, 179);
	width: 50%;
	margin: 0 auto;
	padding-block: 0.85rem;
	font-size: 0.95rem;
	color: #000;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
	background: 0;
}
.cart-items {
	margin-bottom: 1.5rem;
}
.pay {
	align-self: flex-start;
	width: 30%;
}
@media (max-width: 71.875em) {
	.pay {
		width: 100%;
		align-self: auto;
	}
}
.pay-card {
	background-color: rgb(248, 248, 248);
	padding: 1.5rem;
}

.header2 {
	font-size: 0.7rem;
	font-weight: 700;
	border: 1px solid #eee;
	letter-spacing: 0.5px;
	color: rgb(97, 97, 97);
	padding: 1rem;
}
.text1 {
	display: flex;
	justify-content: space-between;
	font-weight: 700;
	font-size: 0.85rem;
	align-items: center;
	margin-bottom: 1.25rem;
}

.text2 {
	display: flex;
	justify-content: space-between;
	font-weight: 700;
	font-size: 0.85rem;
	align-items: center;
	margin-bottom: 3rem;
	gap: 1rem;
}
.total-price-all-order-items {
	font-size: 1.5rem;
}
.text2 .shipping-message {
	color: gray;
	font-weight: 500;
	font-size: 0.8rem;
}
.m0 {
	margin: 0;
}
.free-shipping-message {
	background-color: #0f0f0f;
	color: white;
	font-size: 0.65rem;
	font-weight: 700;
	text-align: center;
	padding-block: 0.2rem;
	letter-spacing: 0.5px;
	margin-bottom: 1.5rem;
}
.free-shipping-message2 {
	color: #a5a5a5;
	font-size: 0.9rem;
	margin-bottom: 2.5rem;
}
.spend-message {
	font-weight: 700;
	font-size: 0.9rem;
	margin-bottom: 1rem;
}
@media (max-width: 70.25em) {
	.spend-message {
		font-size: 0.8rem;
	}
}
.spend-message span {
	color: rgb(0, 177, 0);
}
.free-shipping-message2 span {
	color: rgb(0, 177, 0);
	font-weight: 700;
}

.shipping-input label {
	font-size: 0.7rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	display: inline-block;
}
.shipping-input textarea {
	width: 100%;
	min-height: 30vh;
	padding: 0.75rem;
	resize: vertical;
	border: 1px solid #e0e0e0;
	font-size: 0.8rem;
}
.shipping-input textarea::placeholder {
	text-transform: uppercase;
	font-size: 0.8rem;
	color: #cacaca;
}
.shipping-input textarea:focus {
	outline: 0;
}
</style>
