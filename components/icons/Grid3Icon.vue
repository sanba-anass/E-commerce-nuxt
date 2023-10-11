<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1.5rem"
		height="1.5rem"
		viewBox="0 0 24 24"
	>
		<path
			:fill="isActive ? '#000000' : '#CFCFCF'"
			d="M20 17h-4v-4h4v4Zm-6 0h-4v-4h4v4Zm-6 0H4v-4h4v4Zm12-6h-4V7h4v4Zm-6 0h-4V7h4v4Zm-6 0H4V7h4v4Z"
		></path>
	</svg>
</template>

<script setup lang="ts">
interface Props {
	isActive: boolean;
}
const { isActive } = defineProps<Props>();
</script>
