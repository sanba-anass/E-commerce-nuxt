<template>
	
	<div class="side-bar">
		<div class="title">
			<FilterIcon />
			<h2>FILTER BY</h2>
		</div>
		<button class="clear-button">
			<TrashIcon />
			<p>Clear All</p>
		</button>
		<div class="filter-by-items">
			<FilterByItem
				v-for="(item, index) in filterByItems"
				:title="item.title"
				:index="index"
			/>
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
	{
		title: "tags",
	},
];
</script>

<style scoped>
.side-bar {
	width: 35%;
	align-self: flex-start;
}
@media (max-width: 60.875em) {
	.side-bar {
		display: none;
	}
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
.side-bar .title::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: rgb(207, 207, 207);
	bottom: -0.5rem;
	left: 0;
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
