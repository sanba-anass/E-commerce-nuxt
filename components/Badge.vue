<template>
	<div v-if="num !== 0 && user" class="badge">{{ num }}</div>
</template>

<script setup lang="ts">
interface Props {
	num: number;
}
const { num } = defineProps<Props>();
const user = useSupabaseUser();
</script>

<style scoped>
.badge {
	position: absolute;
	top: -0.4rem;
	background: rgb(216, 42, 12);
	right: -0.4em;
	font-size: 0.6rem;
	font-weight: 700;
	color: white;
	border-radius: 100%;
	width: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 14px;
	padding: 0.5rem;
}
</style>
