<template>
	<div class="toast" :class="{ 'is-open': isOpen }">
		<div class="top-bar">
			<BellIcon color="white" />
			<p>
				{{
					isFavouriteItem
						? "this item has been added to your wishlist"
						: "this item has been added to your cart"
				}}
			</p>
			<button class="close-button" @click="close">
				<CloseIcon color="white" />
			</button>
		</div>
		<div class="toast-content">
			<NuxtImg :src="imageUrl" />
			<div :title="title" class="title">
				{{ title.length > 30 ? title.substring(0, 24) + "..." : title }}
			</div>
			<NuxtLink to="/wishlist" v-if="isFavouriteItem" @click="close">{{
				text
			}}</NuxtLink>
			<a v-else href="/shop/cart"> View Cart</a>
		</div>
		<div class="progress-bar">
			<div class="progress" :style="{ width: progress + '%' }"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	duration: number;
	title: string;
	imageUrl: string;
	text: string;
}
const { duration, text } = defineProps<Props>();

const { isOpen, close, isFavouriteItem, progress } = useToast(duration);
</script>

<style scoped>
.toast {
	position: fixed;
	bottom: 20px;
	right: 20px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
	opacity: 0;
	transform: translateX(100%);
	transition: all 0.2s ease-in-out;
	z-index: 90000;
}
.toast.is-open {
	opacity: 1;
	transform: translateX(0);
}
.progress-bar {
	position: relative;
	height: 5px;
	background-color: rgba(0, 0, 0, 0.1);
}
.progress {
	top: 0;
	left: 0;
	height: 100%;
	background-color: #000;
	transition: 0.3s;
}
.message {
	font-size: 16px;
	line-height: 1.5;
}
.toast-content {
	display: flex;
	padding: 0.7rem;
	align-items: center;
}
.toast-content a {
	font-size: 0.7rem;
	background-color: black;
	color: white;
	text-decoration: none;
	padding: 0.5rem;
	margin-left: auto;
}
.toast-content img {
	width: 40px;
}
.toast-content .title {
	font-weight: bold;
	font-size: 0.8rem;
	margin-left: 1rem;
	text-overflow: ellipsis;
}

.close-button {
	cursor: pointer;
	transform: scale(0.7);
	background: 0;
	border: 0;
	display: block;
	display: flex;
	align-items: center;
	justify-content: center;
}
.top-bar {
	display: flex;
	padding: 0.25rem 1rem;
	background-color: black;
	align-items: center;
	gap: 1.25rem;
}
.top-bar p {
	text-transform: uppercase;
	color: white;
	font-weight: 700;
	font-size: 0.65rem;
}
</style>
