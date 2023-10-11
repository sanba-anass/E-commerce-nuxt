<template>
	<ClientOnly>
		<div @click="active = !active" class="item">
			<div class="content">
				<ListIcon />
				<div class="title">{{ title }}</div>
			</div>
			<PlusIcon v-if="!active" />
			<MinusIcon v-else />
		</div>
		<div :class="{ active }" class="inner-content">
			<div>
				<div class="actual-content">
					<component :is="filterbyContent[index]" />
				</div>
			</div>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import { FilterByPrice } from "#components";
import { FilterByAvaliabilty } from "#components";
import { FilterByBrand } from "#components";
import { FilterByColor } from "#components";
import { FilterByTags } from "#components";
import { FilterBySize } from "#components";
import { FilterByType } from "#components";

const filterbyContent: any = [
	FilterByPrice,
	FilterByAvaliabilty,
	FilterByType,
	FilterByBrand,
	FilterByColor,
	FilterBySize,
	FilterByTags,
];

interface Props {
	title: string;
	index: number;
}

const { title, index } = defineProps<Props>();
const active = ref(true);
</script>

<style scoped>
.actual-content {
	padding: 1.5rem 0;
}
.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	position: relative;
}
.inner-content {
	margin-bottom: 1.5rem;
	display: grid;
	grid-template-rows: 0fr;
	transition: grid-template-rows 0.3s;
}
.inner-content > div {
	overflow: hidden;
}
.inner-content.active {
	grid-template-rows: 1fr;
}

/* .item:not(:last-child) ::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: rgb(207, 207, 207);
	bottom: -0.75rem;
	left: 0;
} */

.content {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.75rem;
}
.item .title {
	font-weight: 800;
	font-size: 0.85rem;
	text-transform: uppercase;
}
.title span {
	margin-left: 0.5rem;
	display: inline-block;
}
</style>
