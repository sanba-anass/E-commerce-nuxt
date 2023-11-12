<template>
	<div :class="{ open: isDrawerOpen }" class="cart-drawer">
		<header>
			<h2>Cart</h2>
			<button @click="closeCartDrawer">
				<CloseIcon :color="'black'" />
			</button>
		</header>
		<main class="cart-content">
			<div>
				<ul
					:class="{ 'border-bottom': orderItems?.data.length === 3 }"
					v-if="orderItems?.data.length !== 0"
					class="order-items"
				>
					<OrderItem
						v-for="item in orderItems.data"
						:title="item.title"
						:price="item.price"
						:image="item.image"
						:productId="item.product_id"
						:totalQuantity="item.total_quantity"
						:key="item.id"
						:sku="item.sku"
						:size="item.size"
					/>
				</ul>
				<div class="text-center" v-else>No products in the cart.</div>
			</div>
			<div class="buttons">
				<NuxtLink to="/checkout" class="checkout">Checkout</NuxtLink>
				<NuxtLink to="/shop/cart" class="view-cart">View Cart</NuxtLink>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const { data: orderItems } = await useAsyncData(
	async () =>
		await supabase
			.from("order_item")
			.select("*")
			.order("created_at", { ascending: false })
);
const { closeCartDrawer, isDrawerOpen } = useOpenCartDrawer();

console.log(orderItems.value);
</script>

<style scoped>
.text-center {
	text-align: center;
	margin-top: 5rem;
	font-size: 1.15rem;
}
button {
	background: 0;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
h2 {
	font-size: 1rem;
	text-transform: uppercase;
	font-weight: 400;
	letter-spacing: 1px;
}
header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	padding: 1.25rem 1.5rem;
}
header::before {
	content: "";
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: #e2e2e2;
	bottom: 0;
	right: 0;
	left: 0;
}
.cart-drawer {
	box-shadow: 6px 0px 15px rgba(0, 0, 0, 0.425);
	min-height: 100vh;
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

@media (max-width: 26.3125em) {
	.cart-drawer {
		width: 85%;
	}
}
.open {
	transform: translateX(0%);
	overflow: hidden;
}
.cart-saved-items {
	display: flex;
	justify-content: center;
	align-items: center;
}
.order-items {
	height: 300px;
	overflow: auto;
	margin-right: 0.25rem;
}
.border-bottom {
	border-bottom: 1px solid #eee;
}

.order-items::-webkit-scrollbar {
	width: 9px;
}

/* Track */

.order-items::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */

.order-items::-webkit-scrollbar-thumb {
	background: #b3b3b3;
	border-radius: 10rem;
}

/* Handle on hover */

.order-items::-webkit-scrollbar-thumb:hover {
	background: #797979;
}
.cart-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 90vh;
}
.checkout {
	background: black;
	width: 100%;
	margin: 0 auto;
	padding-block: 0.85rem;
	font-size: 0.95rem;
	color: rgb(255, 255, 255);
	margin-bottom: 1rem;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
}
.view-cart {
	border: 1px solid rgb(179, 179, 179);
	width: 100%;
	margin: 0 auto;
	padding-block: 0.85rem;
	font-size: 0.95rem;
	color: #000;
	margin-bottom: 2rem;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	text-decoration: none;
}
.buttons {
	padding-inline: 1.5rem;
	user-select: none;
}
</style>
