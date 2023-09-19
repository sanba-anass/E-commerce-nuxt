<template>
	<div class="slot">
		<slot />
	</div>
</template>

<style scoped>
.slot {
	background-color: rgb(255, 255, 255);
	opacity: 0;
	height: 0px;
	width: 100%;
	position: absolute;
	z-index: -1;
	/* transition: 0.3s opacity, 0.3s height; */
	padding: 0rem;
}
</style>
