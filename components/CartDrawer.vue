<template>
	<div :class="{ open: !isOpen }" class="cart-drawer">
		<header>
			<h2>Cart</h2>
			<button @click="closeCartDrawer">
				<CloseIcon />
			</button>
		</header>
		<div class="cart-saved-items">
			<p class="cart-message">your cart is empty</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const { isOpen, closeCartDrawer } = useOpenCartDrawer();
const screenWidth = ref<number | null>(null);
if (process.client) {
	screenWidth.value = screen.width;
}
</script>

<style scoped>
.cart-saved-items {
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 64px);
}
.cart-message {
	text-transform: uppercase;
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
	transform: translateX(0%);
	background-color: #ffffff;
	transition-timing-function: ease-in-out;
	position: fixed;
	right: 0;
	z-index: 999999999;
	transition: 0.5s transform;
	overflow: auto;
}
@media (max-width: 700px) {
	.cart-drawer {
		width: 75%;
	}
}
.open {
	transform: translateX(102%);
	overflow: hidden;
}
.cart-saved-items {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
