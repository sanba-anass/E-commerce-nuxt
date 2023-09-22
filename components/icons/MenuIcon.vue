<template>
	<div class="wrapper">
		<!-- <svg
			class="menu-icon"
			width="1.25em"
			height="1.25em"
			role="presentation"
			viewBox="0 0 20 14"
		>
			<path
				d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z"
				fill="currentColor"
			></path>
		</svg> -->
		<div class="menu-icon" :class="{ active: isOpen }">
			<div class="menu-bar one"></div>
			<div class="menu-bar two"></div>
			<div class="menu-bar three"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { isOpen } = defineProps<{ isOpen: boolean }>();
</script>

<style scoped>
.menu-icon {
	width: 1.5rem;
	height: 1.5rem;
	position: relative;
}

.menu-bar {
	position: absolute;
	width: 100%;
	height: 2px;
	background: rgb(0, 0, 0);
	left: 0%;
	cursor: pointer;
}

.one {
	top: 11px;
	animation-delay: 0.1s;
	transition: all 0.3s;
}

.two {
	top: 5px;
	transition: all 0.3s;
}
.three {
	bottom: 5px;
	transition: all 0.3s;
}

@keyframes slideOut {
	0% {
		width: 100%;
		left: 0%;
		right: auto;
	}

	50% {
		width: 0%;
		left: 0%;
		right: auto;
	}
	51% {
		width: 0%;
		right: 0%;
		left: auto;
	}

	100% {
		width: 100%;
		right: 0%;
		left: auto;
	}
}

/**/

.menu-icon:hover .menu-bar.active {
	animation: none;
}
.active .two {
	top: 50%;
	left: 0%;
	transform: rotate(45deg);
}
.active .three {
	top: 50%;
	left: 0%;
	transform: rotate(-45deg);
}
.active .one {
	animation: fadeOut 0.3s forwards;
	opacity: 1;
}
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@media (min-width: 76.625rem) {
	.menu-icon {
		display: none;
	}
}
</style>
