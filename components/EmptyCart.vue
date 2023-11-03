<template>
	<h1>Your Cart Is Currently Empty.</h1>
	<p>
		Before proceeding to checkout you must add some products to your shopping
		cart. You will find a lot of interesting products on our "Shop" page.
	</p>
	<NuxtLink to="/shop?page=1">Continue Shopping</NuxtLink>
</template>

<script setup lang="ts"></script>

<style scoped>
h1 {
	margin-bottom: 1rem;
    margin-top: 6rem;
}
p {
	color: rgb(161, 161, 161);
	margin-bottom: 2rem;
    max-width: 50rem;
    line-height: 1.7;
    font-size: 1.1rem;
}
a {
	padding: 0.85rem 1.75rem;
	font-weight: 700;
	background: rgb(19, 19, 19);
	border: none;
	color: white;
	display: inline-block;
    font-size: 0.95rem;
    cursor: pointer;
    text-decoration: none;

}
</style>
