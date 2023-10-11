<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1.5rem"
		height="1.5rem"
		viewBox="0 0 24 24"
	>
		<path
			:fill="isActive ? '#000000' : '#CFCFCF'"
			d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
		></path>
	</svg>
</template>
<script setup lang="ts">
interface Props {
	isActive: boolean;
}
const { isActive } = defineProps<Props>();
</script>
