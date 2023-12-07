<template>
	<div class="container">
		<div class="header">
			<button @click="openDrawer" class="filter-icon">
				<FilterIcon />
			</button>
			<div class="top-bar">
				<div class="icons">
					<template v-for="(icon, index) in icons">
						<button @click="changeView(index)" class="grid-icon-button">
							<component
								class="grid-icon"
								:is="icon.comp"
								v-bind="{ isActive: icon.isActive }"
							/>
						</button>
						<div class="v-line"></div>
					</template>
				</div>
				<select v-model="selectedFilter">
					<option v-for="option in productFilterOptions" :value="option">
						{{ option }}
					</option>
				</select>
			</div>
		</div>
		<div class="wrapper">
			<FilterBySideBar />
			<div class="wrapper2">
				<h2 class="error-message" v-if="_products?.length === 0">
					no Products Found!
				</h2>

				<div v-else class="shop-items slider">
					<ProductItem
						v-for="product in prods"
						:url1="product.preview_images[0]"
						:url2="product.preview_images[1]"
						:title="product.title"
						:price="product.price"
						:oldPrice="null"
						:id="product?.id"
						:key="product?.id"
						:rating="product.rating"
						:availability="product.availability"
						:productType="product.product_type"
						:brand="product.brand"
					/>
				</div>
				<Pagination :filter="selectedFilter" />
			</div>
		</div>
		<Teleport to="body">
			<ProductsDrawer :class="{ isOpen }" />

			<div @click="closeDrawer" v-if="isOpen" class="overlay"></div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { Grid2Icon } from "#components";
import { Grid3Icon } from "#components";

const supabase = useSupabaseClient();

const count = useCount();

const route = useRoute();

const { from, to, showPagination, hidePagination } = usePagination();
const productFilterOptions = [
	"Best Sellers",
	"Featured",
	"New Arrivals",
	// "alphabetically A-Z",
	// "alphabetically Z-A",
	// "price, low to high",
	// "price, high to low",
	// "date old to new",
	// "date new to old",
];

const _products = useProductList();

const filter = useCookie("filter", {
	default: () => "Best Sellers",
});
const selectedFilter = ref(filter.value);
const filterValues = useCookie("filterValues", {
	default: () => [selectedFilter.value],
});
watch(
	selectedFilter,
	() => {
		filter.value = selectedFilter.value;
		filterValues.value[0] = filter.value;
	},
	{ immediate: true }
);

watch(selectedFilter, (newValue) => {
	console.log(filterValues.value);
});

console.log("filterValues", filterValues.value);
const minPrice = useCookie<number>("minPrice");
const maxPrice = useCookie<number>("maxPrice");

const prices = computed(() =>
	Array.from({ length: maxPrice.value + minPrice.value }, (_, k) => k).slice(
		minPrice.value,
		maxPrice.value + 1
	)
);
const { data } = await useAsyncData(async () => {
	return await supabase
		.from("product")
		.select("*")
		.range(from.value, to.value)
		.eq("category", filter.value);
});

_products.value = data.value?.data;

const prods = computed(() =>
	_products.value.filter(
		({ price }) => price <= maxPrice.value && price >= minPrice.value
	)
);
watch(maxPrice, () => {
	console.log(maxPrice.value.toString().length);
});
watch(
	[minPrice, maxPrice],
	() => {
		if (prods.value.length <= 10) {
			hidePagination();
		}
		else{
			showPagination()
		}
	},
	{ immediate: true }
);
watch(
	[from, to, selectedFilter],
	async ([newFrom]) => {
		if (newFrom > 24) {
			return;
		}
		if (newFrom < 0) {
			return;
		}
		const { data } = await useAsyncData(async () => {
			return await supabase
				.from("product")
				.select("*")
				.eq("category", filter.value)
				.in("price", prices.value)
				.order("price", { ascending: true })
				.range(from.value, to.value);
		});
		_products.value = data.value?.data;
	},
	{ immediate: true }
);
async function filterProducts() {
	if (filterValues.value.length === 1) {
		const { data } = await supabase
			.from("product")
			.select("*")
			.eq("category", filter.value)
			.in("price", prices.value)
			.order("price", { ascending: true })
			.range(from.value, to.value);

		_products.value = data;
	} else {
		const { data } = await supabase
			.from("product")
			.select("*")
			.eq("category", filter.value)
			.in("price", prices.value)
			.order("price", { ascending: true });

		_products.value = data;

		if (
			filterValues.value.includes("inStock") ||
			filterValues.value.includes("outStock")
		) {
			_products.value = _products.value.filter(({ availability }) => {
				return filterValues.value.includes(availability);
			});
		}
		if (
			filterValues.value.includes("Blouses") ||
			filterValues.value.includes("Denim") ||
			filterValues.value.includes("Jacket") ||
			filterValues.value.includes("T-Shirt") ||
			filterValues.value.includes("Trousers") ||
			filterValues.value.includes("Dresses")
		) {
			_products.value = _products.value.filter(({ product_type }) => {
				return filterValues.value.includes(product_type);
			});
		}

		if (
			filterValues.value.includes("Burberry") ||
			filterValues.value.includes("Kenzo") ||
			filterValues.value.includes("Louis Vuitton") ||
			filterValues.value.includes("Police") ||
			filterValues.value.includes("Tomford") ||
			filterValues.value.includes("Vinova")
		) {
			_products.value = _products.value?.filter(({ brand }) =>
				filterValues.value.includes(brand)
			);
		}
		if (
			filterValues.value.includes("rgb(0,0,0)") ||
			filterValues.value.includes("rgb(36,55,79)") ||
			filterValues.value.includes("rgb(85,107,47)") ||
			filterValues.value.includes("rgb(172,253,47)") ||
			filterValues.value.includes("rgb(100,149,237)") ||
			filterValues.value.includes("rgb(128,128,128)") ||
			filterValues.value.includes("rgb(217,182,154)") ||
			filterValues.value.includes("rgb(231,166,72)") ||
			filterValues.value.includes("rgb(198,132,177)") ||
			filterValues.value.includes("rgb(255,255,255)") ||
			filterValues.value.includes("rgb(250,240,230)")
		) {
			_products.value = _products.value?.filter(({ color }) =>
				filterValues.value.includes(color)
			);
		}
		if (
			filterValues.value.includes("Burberry") ||
			filterValues.value.includes("Kenzo") ||
			filterValues.value.includes("Louis Vuitton") ||
			filterValues.value.includes("Police") ||
			filterValues.value.includes("Tomford") ||
			filterValues.value.includes("Vinova")
		) {
			_products.value = _products.value?.filter(({ brand }) =>
				filterValues.value.includes(brand)
			);
		}
		if (
			filterValues.value.includes("XS") ||
			filterValues.value.includes("S") ||
			filterValues.value.includes("M") ||
			filterValues.value.includes("XL") ||
			filterValues.value.includes("L") ||
			filterValues.value.includes("XXL") ||
			filterValues.value.includes("X")
		) {
			_products.value = _products.value.filter(({ size }) => {
				return filterValues.value.includes(size);
			});
		}
	}
}
watch(filterValues, async () => {}, { deep: true, immediate: true });
watch(selectedFilter, () => {
	filter.value = selectedFilter.value;
});
watch(
	[filterValues, selectedFilter],
	async () => {
		const { data } = await supabase
			.from("product")
			.select("*")
			.eq("category", filter.value)
			.in("price", prices.value)
			.order("price", { ascending: true });
		console.log("categories", data?.length);
		filterProducts();
		if (filterValues.value.length > 1 || data?.length <= 12) {
			hidePagination();
		} else {
			showPagination();
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

const cols = ref(3);
const icons = shallowRef([
	{
		comp: Grid3Icon,
		isActive: true,
	},
	{
		comp: Grid2Icon,
		isActive: false,
	},
]);
const changeView = (index: number) => {
	icons.value[index].isActive = true;
	icons.value.forEach((_, i) => {
		if (index !== i) {
			icons.value[i].isActive = false;
		}
	});
	switch (index) {
		case 0:
			cols.value = 3;
			break;
		case 1:
			cols.value = 2;
			break;
		case 2:
			cols.value = 1;

			break;
	}
};

const isOpen = ref(false);
function openDrawer() {
	isOpen.value = true;

	document.body.style.overflow = "hidden";
}

function closeDrawer() {
	isOpen.value = false;
	document.body.style.overflow = "visible";
	console.log(route.fullPath);
}
if (process.client) {
	const match = window.matchMedia("(min-width: 51.875em)");
	onMounted(() => {
		match.addEventListener("change", closeDrawer);
		console.log("sqsqsqsqsqsqs");
	});
	onUnmounted(() => {
		match.removeEventListener("change", closeDrawer);
	});
}
const switchTo2Columns = (match: any) => {
	if (match.matches) {
		cols.value = 2;

		icons.value[1].isActive = true;
		icons.value[0].isActive = false;
	} else {
		cols.value = 3;
		icons.value[0].isActive = true;
		icons.value[1].isActive = false;
	}
};
if (process.client) {
	const match = window.matchMedia("(max-width: 45em)");
	onMounted(() => {
		match.addEventListener("change", switchTo2Columns);
		console.log("sdds");
	});
	onUnmounted(() => {
		match.removeEventListener("change", switchTo2Columns);
	});
}

if (!route.query.page) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
		fatal: true,
	});
}
</script>

<style scoped>
.error-message {
	text-align: center;
	margin-block: 5rem;
}
.isOpen {
	transform: translate(0%);
}
.filter-icon {
	transform: scale(2);
	flex-shrink: 0;
	background: 0;
	border: 0;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.wrapper2 {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.container {
	width: 95%;
	max-width: 105rem;
	margin: 0 auto;
}
.wrapper {
	display: flex;
	gap: 3rem;
}
.top-bar {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 2rem;
	gap: 1rem;
	margin-bottom: 4rem;
}
.top-bar .icons {
	display: flex;
	cursor: pointer;
	align-items: center;
	flex-shrink: 0;
}

.top-bar select {
	padding: 0.5rem;
	width: 10rem;
	border: 0;
	border-bottom: 2.5px solid rgb(24, 24, 24);
}
.top-bar select:focus {
	outline: none;
}
.v-line {
	height: 1rem;
	width: 1px;
	background-color: rgb(201, 201, 201);
	margin-inline: 0.75rem;
}

.container .shop-items {
	display: grid;
	grid-template-columns: repeat(v-bind(cols), 1fr);
	gap: 2rem;
	margin-bottom: 5rem;
	transition: 0.3s;
}

.slider .slider-item {
	transition: 0.3s;
}
.slider .slider-item .arrows .left-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(-1rem);
}
.slider .slider-item:hover .left-arrow {
	opacity: 1;
	transform: translateX(0);
}
.slider .slider-item .arrows .right-arrow {
	transition: 0.3s opacity, 0.3s transform;
	opacity: 0;
	transform: translateX(1rem);
}
.slider .slider-item:hover .right-arrow {
	opacity: 1;
	transform: translateX(0);
}
.top-bar .grid-icon-button {
	background: 0;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

@media (max-width: 45em) {
	.container {
		padding-inline: 1.25rem;
		width: 100%;
	}
	.container .icons {
		display: none;
	}
}
@media (min-width: 60.875em) {
	.filter-icon {
		display: none;
	}
	.header {
		justify-content: flex-end;
	}
}
@media (max-width: 29.6875em) {
	.slider .slider-item {
		width: 100%;
		margin-bottom: 1.5rem;
	}
	.top-bar {
		justify-content: center;
	}
	.top-bar .icons:nth-child(1) {
		display: none;
	}
	.top-bar .icons:nth-child(2) + .v-line {
		display: none;
	}
	.top-bar {
		display: block;
		margin-bottom: 2rem;
		width: 100%;
	}
	.top-bar select {
		display: block;
		margin: 0 auto;
		width: 100%;
		flex: 1;
		border: 1px solid;
	}
	.header {
		gap: 1.5rem;
	}
	.container .shop-items {
		display: block;
	}
}
</style>
