<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1.5rem"
		height="1.5rem"
		viewBox="0 0 32 32"
	>
		<path
			:fill="color"
			d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586L17.414 16z"
		></path>
	</svg>
</template>
<script setup lang="ts">
interface Props {
	color?: string;
}
const { color = "black" } = defineProps<Props>();
</script>
