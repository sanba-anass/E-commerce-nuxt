<template>
<div class="loading-spinner"></div>
</template>
<style scoped>
.loading-spinner {
	border: 4px solid rgba(0, 0, 0, 0.3);
	border-top: 4px solid #000000;
	border-radius: 50%;
	width: 1.25rem;
	height: 1.25rem;
	animation: spin 0.4s linear infinite;
	margin: 0 auto;
	position: relative;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>