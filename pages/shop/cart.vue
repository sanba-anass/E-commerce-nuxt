<template>
	<div class="container">
		<h2>SHOPPING CART</h2>
		<EmptyCart v-if="orderItems.data?.length === 0" />
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
					/>
				</ul>
				<div class="buttons">
					<NuxtLink class="checkout">Procced To Checkout</NuxtLink>
					<NuxtLink to="/" class="shopping">Continue Shopping</NuxtLink>
				</div>
			</div>
			<div class="pay">
				<header class="header2">THERE ARE 51 ITEMS IN YOUR CART</header>

				<div class="pay-card">
					<div class="text1">
						<div class="title">TOTAL:</div>
						<div class="total-price-all-order-items">
							${{ order?.data[0].total_order_price.toFixed(2) }}
						</div>
					</div>
					<div class="text2">
						<div class="title">SHIPPING:</div>
						<div class="shipping-message">
							Shipping & taxes calculated at checkout
						</div>
					</div>
					<div class="free-shipping-message">
						CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!
					</div>
					<div class="free-shipping-message2">
						Free shipping for any orders above <span>$500.00</span>
					</div>
					<div class="shipping-input">
						<label for="note">ADD A NOTE TO YOUR ORDER : </label>
						<textarea placeholder="add your note here"></textarea>
					</div>
				</div>
				<PayPalButton />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const { data: orderItems } = await useAsyncData(
	async () => await supabase.from("order_item").select("*")
);
const { data: order } = await useAsyncData(
	async () => await supabase.from("order").select("*")
);


console.log(orderItems.value?.data);
</script>

<style scoped>
.header1 {
	background-color: rgb(243, 243, 243);
	padding-block: 1rem;
	border: 1px solid #e0e0e0;
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
.items {
	width: 70%;
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
.buttons {
	gap: 1.5rem;
	display: flex;
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
}
.total-price-all-order-items {
	font-size: 1.5rem;
}
.text2 .shipping-message {
	color: gray;
	font-weight: 500;
	font-size: 0.8rem;
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
