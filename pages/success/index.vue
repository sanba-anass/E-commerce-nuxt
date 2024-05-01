<template>
	<div class="wrapper">
		<div class="content">
			<SuccessIcon class="icon" />
			<h1>Payment successfully Completed!</h1>
			<NuxtLink to="/shop?page=1" class="shopping">Continue Shopping</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import confetti from "canvas-confetti";
definePageMeta({
	middleware: ["success"],
});
const user = useSupabaseUser();
onMounted(() => {
	confetti({
		particleCount: 200,
		spread: 160,
	});
});
</script>

<style scoped>
.wrapper {
	display: flex;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 58px);
}
.content {
	text-align: center;
}
.shopping {
	background: black;
	color: white;
	cursor: pointer;
	border: 0;
	font-weight: 600;
	padding: 1rem 2rem;
	margin-top: 4rem;
	font-size: 1.03rem;
	display: inline-block;
	text-decoration: none;
}
.icon {
	margin-bottom: 1.5rem;
}
</style>
