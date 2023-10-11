<template>
	<div class="tags">
		<div v-for="(tag, index) in tags">
			<div @click="setActiveColor(index)">
				<button
					:class="{ 'active-tag': tag.isActive }"
					:placeholder="tag.text"
					:id="tag.text"
					class="tag"
				>
					{{ tag.text }}
				</button>
			</div>
		</div>
	</div>
	<button @click="reset" class="reset-button">Reset</button>
</template>

<script setup lang="ts">
const _tags = ref([]);
const tags = ref([
	{ text: "Acessories", isActive: false },
	{ text: "Men", isActive: false },
	{ text: "Women", isActive: false },
	{ text: "upsell", isActive: false },
	{ text: "Vendor Levi's", isActive: false },
]);
function setActiveColor(index: number) {
	tags.value[index].isActive = !tags.value[index].isActive;
	if (tags.value[index].isActive) {
		_tags.value.push(tags.value[index].text);
	} else {
		_tags.value = _tags.value.filter((tag) => tag !== tags.value[index].text);
	}
}

const products = useProductList();
const supabase = useSupabaseClient();

watch(
	_tags,
	async (newTags) => {
		if (newTags.length === 0) {
			const { data: defaultProducts } = await supabase
				.from("product")
				.select("*")
				.range(0, 11);
			products.value = defaultProducts;
			return;
		}
		const { data: newProducts } = await supabase
			.from("product")
			.select("*")
			.in("tag", newTags);
		products.value = newProducts;
	},
	{ deep: true }
);
function reset() {
	_tags.value = [];
	tags.value.forEach((tag) => {
		tag.isActive = false;
	});
}
</script>

<style scoped>
.reset-button {
	padding: 0.15rem 0.75rem;
	margin-left: auto;
	display: block;
	border: 0;
	border-radius: 4px;
	transition: 0.3s;
	font-size: 0.9rem;
}
.tag {
	background: 0;
	display: block;
	padding: 0.3rem 1rem;
	border: 1px solid rgb(226, 226, 226);
	font-size: 0.85rem;
	appearance: none;
	cursor: pointer;
}
::placeholder {
	color: black;
}
.tag:hover {
	color: rgb(255, 255, 255);
	background-color: rgb(22, 22, 22);
}
.active-tag {
	color: rgb(255, 255, 255);
	background-color: rgb(22, 22, 22);
}
.tags {
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-bottom: 2rem;
}
</style>
