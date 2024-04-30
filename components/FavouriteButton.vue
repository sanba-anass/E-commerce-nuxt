<template>
	<button
		@click="
			updateLikeStatus();
			pumpHeart();
		"
		:class="{ pump: isPumping }"
		class="heart-button"
	>
		<HeartIconFilled v-if="currentProduct?.is" />
		<HeartIcon2 v-else />
	</button>
</template>

<script setup lang="ts">
interface Props {
	id: string;
	colorName: string;
	size: string;
} //@ts-ignore

const props = defineProps<Props>();
const supabase = useSupabaseClient();
const products = useProductList();
const user = useSupabaseUser();
const { open, toastId } = useToast(30);
const { closeProductDrawer } = useProductDrawer();
const { openDialog } = useDialog();

const currentProduct = computed(() =>
	products.value.find((product) => product.id === props.id)
);

const updateLikeStatus = async () => {
	closeProductDrawer();
	if (!user.value) {
		openDialog("info", "please login to be able to perform this action");
		return;
	}
	console.log(props.id);

	if (currentProduct.value) {
		isItem.value = true;
		toastId.value = currentProduct.value.id;
		currentProduct.value.is = !currentProduct.value?.is;

		await supabase
			.from("product")
			//@ts-ignore
			.update({
				is: currentProduct.value?.is,
				user_id: user.value.id,
			})
			.eq("id", props.id);

		if (currentProduct.value?.is) {
			open();

			await supabase.from("wishlist").insert({
				product_id: currentProduct.value?.id,
				title: currentProduct.value?.title,
				sku: currentProduct.value?.sku,
				price: currentProduct.value?.price,
				image: currentProduct.value?.detail_images[0],
				colorName: props.colorName,
				size: props.size,
			});
		} else {
			// fix this
			await supabase
				.from("wishlist")
				.delete()
				.eq("product_id", currentProduct.value?.id);
		}
		await refreshNuxtData();
	}
};
const isPumping = ref(false);

const pumpHeart = () => {
	isPumping.value = true;
	setTimeout(() => {
		isPumping.value = false;
	}, 300);
};
</script>

<style scoped>
.heart-button {
	position: absolute;
	top: 1rem;
	right: -2rem;
	background: 0;
	border: 0;
	opacity: 0;
}

@keyframes heartPump {
	0% {
		transform: scale(0.9);
	}

	100% {
		transform: scale(1.25);
	}
}
.pump {
	animation: heartPump 300ms;
}
.pump-reverse {
	animation: heartPump 300ms forwards;
}
.heart {
	cursor: pointer;
	color: red;
	font-size: 2em;
	transition: color 0.3s;
}

.heart:hover {
	color: darkred;
}
</style>
