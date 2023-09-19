<template>
	<div class="account-wrapper">
		<form>
			<div class="link-wrapper">
				<NuxtLink to="/account/login" class="back-link">
					<div class="arrow-icon"><ArrowIcon /><span> back</span></div>
				</NuxtLink>
			</div>
			<h2>Forgot your password?</h2>
			<p>
				No worries. Just enter your email address below to receive instructions
				for resetting it.
			</p>
			<label for="email">Your E-mail</label>

			<input type="email" name="email" id="email" />

			<button class="login-button" type="submit">Send</button>
		</form>
	</div>
</template>

<script setup></script>

<style scoped>
.link-wrapper {
	width: 100%;
}
.arrow-icon {
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	padding: 0.75rem 1rem;
}
.account-wrapper {
	display: flex;
	justify-content: space-between;
	max-width: 105rem;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 58px);
}
@media ((max-width: 48.25em)  or (orientation: portrait)) {
	.account-wrapper {
		justify-content: center;
	}
}
form {
	display: flex;
	flex-direction: column;
	flex-basis: 50%;
	padding: 0 4rem;
	align-items: center;
	justify-content: center;
}
@media (max-width: 34.9375em) {
	form {
		width: 100%;
		padding-inline: 1.25rem;
	}
}
@media (max-width: 28.625rem) {
	form {
		padding-inline: 1rem;
	}
}
form label {
	width: 100%;
	margin-bottom: 0.3rem;
	display: block;
}
form input {
	padding: 0.65rem 1rem;
	width: 100%;
	margin-bottom: 1.5rem;
	border: 1px solid rgb(73, 73, 73);
}
form input:focus {
	outline: 0px;
	border: 1.5px dashed;

	background-color: rgb(248, 248, 248);
}
form input {
	font-size: 1rem;
}
form button {
	width: 100%;
	padding: 1rem 0;
	font-weight: 800;
	font-size: 0.95rem;
	transition: 0.3s background-color, color;
	margin-bottom: 2rem;
}
.login-button {
	background: black;
	color: white;
}
.google-button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	background: 0;
	border: 1px solid black;
}

form .checkbox {
	display: flex;
	flex-flow: row-reverse;
	align-items: center;
	gap: 1rem;
}
form .checkbox label {
	margin: 0;
	user-select: none;
}
form .checkbox input {
	margin: 0;
	width: 1.35rem;
	height: 1.35rem;
	accent-color: black;
}
form .wrapper {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 2rem;
}
form .link {
	text-decoration: underline;
	font-weight: 700;
	cursor: pointer;
}
.create-account-link span {
	margin-right: 0.25rem;
	font-weight: 400;
	color: rgb(61, 61, 61);
}
h2 {
	margin-bottom: 2rem;
	width: 100%;
	white-space: nowrap;
}

p {
	margin-bottom: 2rem;
	font-size: 16px;
	color: rgb(119, 119, 119);
}
.back-link {
	font-size: 1rem;
	width: fit-content;
	margin-bottom: 5rem;
	display: inline-block;
	text-decoration: none;
}
</style>
