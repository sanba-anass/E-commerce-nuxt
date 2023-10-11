<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1.5rem"
		height="1.5rem"
		viewBox="0 0 24 24"
	>
		<path
		:fill="isActive ? '#000000' : '#CFCFCF'"
			d="M17 17h-4v-4h4v4Zm-6 0H7v-4h4v4Zm6-6h-4V7h4v4Zm-6 0H7V7h4v4Z"
		></path>
	</svg>

</template>
<script setup lang="ts">
interface Props {
	isActive: boolean;
}
const { isActive } = defineProps<Props>();
</script>