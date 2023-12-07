<template>
	<div class="product-drawer">
		<div class="side-bar">
			<div class="title">
				<FilterIcon />
				<h2>FILTER BY</h2>
			</div>
			<button class="clear-button">
				<TrashIcon />
				<p>Clear All</p>
			</button>
			<ClientOnly>
				<div class="filter-by-items">
					<LazyFilterByItem
						v-for="(item, index) in filterByItems"
						:title="item.title"
						:index="index"
					/>
				</div>
			</ClientOnly>
		</div>
	</div>
</template>

<script setup lang="ts">
const filterByItems = [
	{
		title: "price",
	},
	{
		title: "avaliabilty",
	},

	{
		title: "product type",
	},
	{
		title: "brand",
	},

	{
		title: "color",
	},
	{
		title: "size",
	},
];
</script>

<style scoped>
.product-drawer {
	height: 100vh;
	width: 20rem;
	transform: translateX(-100%);
	transition-timing-function: ease-in-out;
	position: fixed;
	left: 0;
	z-index: 9999999999;
	transition: 0.5s transform;
	background-color: white;
	padding: 1.5rem;
	overflow: auto;
}
@media (max-width: 25rem) {
	.product-drawer {
		width: 17rem;
	}
}
.side-bar .title::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: rgb(207, 207, 207);
	bottom: -0.5rem;
	left: 0;
}
h2 {
	font-size: 1.15em;
	position: relative;
}
.title {
	position: relative;
	display: flex;
	margin-bottom: 3rem;
	align-items: center;
	gap: 0.5rem;
}
.clear-button {
	display: flex;
	align-items: center;
	background: 0;
	border: 0;
	gap: 0.3rem;
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 3rem;
}
</style>
