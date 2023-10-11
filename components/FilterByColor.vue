<template>
	<div class="colors">
		<div v-for="(color, index) in colors">
			<div @click="setActiveColor(index)" class="input">
				<input
					:id="color.color"
					class="color"
					type="checkbox"
					:style="{
						'background-color': color.color,
						border:
							color.color === 'rgb(255,255,255)'
								? '1px solid rgb(200,200,200)'
								: '',
					}"
				/>

				<CheckedIcon
					:color="color.color === 'rgb(255,255,255)' ? 'black' : 'white'"
					v-if="color.isActive"
					class="icon"
				/>
			</div>
		</div>
	</div>
	<button @click="reset" class="reset-button">Reset</button>
</template>

<script setup lang="ts">
const _colors = ref([]);
const colors = ref([
	{ color: "rgb(0,0,0)", isActive: false },
	{ color: "rgb(36,55,79)", isActive: false },
	{ color: "rgb(100,149,237)", isActive: false },
	{ color: "rgb(85,107,47)", isActive: false },
	{ color: "rgb(172,253,47)", isActive: false },
	{ color: "rgb(128,128,128)", isActive: false },
	{ color: "rgb(250,240,230)", isActive: false },
	{ color: "rgb(217,182,154)", isActive: false },
	{ color: "rgb(231,166,72)", isActive: false },
	{ color: "rgb(198,132,177)", isActive: false },
	{ color: "rgb(255,255,255)", isActive: false },
]);
function setActiveColor(index: number) {
	colors.value[index].isActive = !colors.value[index].isActive;
	if (colors.value[index].isActive) {
		_colors.value.push(colors.value[index].color);
	} else {
		_colors.value = _colors.value.filter(
			(color) => color !== colors.value[index].color
		);
	}
}

// const currentProductLength = ref();

const products = useProductList();
const supabase = useSupabaseClient();

watch(
	_colors,
	async (newColors) => {
		if (newColors.length === 0) {
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
			.in("color", newColors);
		products.value = newProducts;
	},
	{ deep: true }
);
function reset() {
	_colors.value = [];
	colors.value.forEach((color) => {
		color.isActive = false;
	});
}
</script>

<style scoped>
.none {
	display: none;
}
.input {
	position: relative;
	cursor: pointer;
}
.input .icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.reset-button {
	padding: 0.15rem 0.75rem;
	margin-left: auto;
	display: block;
	border: 0;
	border-radius: 4px;
	transition: 0.3s;
	font-size: 0.9rem;
}
.color {
	appearance: none;
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 50%;
	border: 0;
	display: block;
	cursor: pointer;
	outline: 0.5rem;
}

.colors {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 2rem;
}
</style>
