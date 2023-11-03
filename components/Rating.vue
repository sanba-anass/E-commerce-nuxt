<template>
	<div class="rating-starts">
		<StartIcon v-for="_ in rating" />
		<OutlineStartIcon v-for="_ in maxRating - rating" />
	</div>
</template>

<script setup lang="ts">
interface Props {
	rating: number;
}
const { rating } = defineProps<Props>();
const maxRating = 5;
</script>
<style scoped></style>
