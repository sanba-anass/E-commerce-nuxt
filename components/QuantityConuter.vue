<template>
	<div class="quantity-counter">
		<button @click="decreaseQuantity">
			<MinusIcon />
		</button>

		<input
			@keydown="onkeydown"
			@input="updateQuantityViaInput"
			type="number"
			class="quantity-input"
			v-model="quan"
		/>

		<button @click="increaseQuantity"><PlusIcon /></button>
	</div>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	isCartItem: boolean;
}

const { id, isCartItem } = defineProps<Props>();
const quantity = defineModel<number>("quantity");
const quan = ref(quantity.value);
const supabase = useSupabaseClient();
const updateTotalQuantity = async () => {
	await supabase
		.from("order_item")
		.update({
			total_quantity: quan.value,
		})
		.eq("id", id);

	await refreshNuxtData();
};
// const updateTotalQuantity2 = async () => {
// 	const { data: orderItem } = await supabase
// 		.from("order_item")
// 		.select("total_quantity")
// 		.eq("product_id", productId);

// 	await supabase
// 		.from("order_item")
// 		.update({ total_quantity: orderItem[0].total_quantity + quantity.value })
// 		.eq("product_id", productId);
// 	await refreshNuxtData();
// };
async function updateQuantity(action: "increase" | "decrease") {
	//@ts-ignore
	if (action === "increase") {
		quan.value++;
		quantity.value++;
	} else {
		quan.value--;
		quantity.value--;
	}
	console.log(quan.value);
	if (isCartItem) {
		updateTotalQuantity();
	}
}
async function increaseQuantity() {
	updateQuantity("increase");
}
async function decreaseQuantity() {
	//@ts-ignore
	if (quantity.value === 1) {
		return;
	}
	updateQuantity("decrease");
}

async function updateQuantityViaInput(event: Event) {
	const eventTarget = event?.target as HTMLInputElement;
	if (eventTarget?.value === "0") {
		eventTarget.value = eventTarget.value.replace(/^0+/, "");
		return;
	}
	//@ts-ignore

	quantity.value = eventTarget.value;
	if (isCartItem) {
		await updateTotalQuantity();
	}
}
function onkeydown(event: Event) {
	const invalidChars = ["-", "+", "e"];

	if (invalidChars.includes((event as KeyboardEvent).key)) {
		event.preventDefault();
	}
}
</script>

<style scoped>
.quantity-input {
	width: 3rem;
	background-color: rgb(247, 247, 247);
	border: 1px solid rgb(219, 219, 219);
	font-size: 1.1rem;
	text-align: center;
	border-inline: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}

.quantity-input:focus {
	outline: none;
}
.quantity-counter {
	display: flex;
	height: 3rem;
	align-self: center;
}
.quantity-counter button {
	align-self: stretch;
	padding: 0.8rem 0.25rem;
	background: none;
	border: 1px solid #eee;
}
</style>
