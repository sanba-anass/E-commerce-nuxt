<template>
	<button class="paypal-button">
		<span class="paypal-button-title"> Buy with </span>
		<span class="paypal-logo"> <i>Pay</i><i>Pal</i> </span>
	</button>
</template>

<script setup lang="ts"></script>

<style scoped>
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
</style>
