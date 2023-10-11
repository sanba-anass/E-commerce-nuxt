<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1.25rem"
		height="1.25rem"
		viewBox="0 0 24 24"
	>
		<path
			:fill="color"
			d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
		></path>
	</svg>
</template>
<script setup lang="ts">
interface Props {
	color: string;
}
const { color } = defineProps<Props>();
</script>
