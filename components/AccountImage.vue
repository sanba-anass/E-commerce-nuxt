<template>
	<div class="account-img">
		Discover The <br />
		Latest Modern<br />
		Styles.
	</div>
</template>

<script setup></script>

<style scoped>
.account-img {
	background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0),
			rgba(0, 0, 0, 0.6)
		),
		url(~/assets/images/login-img.jpg);

	background-size: cover;
	min-height: calc(100vh - 59px);
	flex-basis: 50%;
	background-position: 0% 53%;
	background-repeat: no-repeat;
	font-size: 4rem;
	color: rgba(255, 255, 255, 0.692);
	font-weight: 700;
	text-transform: uppercase;
	filter: brightness(140%);
	flex-shrink: 5;
	padding-left: 2rem;
	display: flex;
	align-items: flex-end;
}
@media (max-width: 75em) {
	.account-img {
		font-size: 3.5rem;
	}
}

@media (max-width: 60.75rem) {
	.account-img {
		font-size: 3rem;
	}
}
@media (max-width: 63.125em) {
	.account-img {
		padding-left: 1rem;
	}
}
@media ((max-width: 48.25em) or (orientation: portrait)) {
	.account-img {
		display: none;
	}
}
</style>
