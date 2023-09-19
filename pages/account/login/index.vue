<template>
	<div class="account-wrapper">
		<form>
			<h2>Login</h2>
			<label for="email">E-mail</label>

			<input type="email" name="email" id="email" />

			<label for="password">Password</label>

			<input type="password" name="password" id="password" />
			<button class="login-button" type="submit">Login</button>
			<div class="wrapper">
				<div class="checkbox">
					<label for="checkbox">Remember me</label>
					<input type="checkbox" name="checkbox" id="checkbox" />
				</div>
				<NuxtLink to="/account/forgot-password" class="link">
					Forgot Password?
				</NuxtLink>
			</div>
			<button class="google-button" type="submit">
				<GoogleIcon />
				<span class="ms-2"> Connect with Google</span>
			</button>
			<div class="create-account-link">
				<span>New here?</span>
				<NuxtLink to="/account/register" class="link">
					Create a New Account
				</NuxtLink>
			</div>
		</form>
		<AccountImage />
	</div>
</template>

<style scoped>
.account-wrapper {
	display: flex;
	justify-content: space-between;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
	min-height: 110vh;
}
@media ((max-width: 48.25em)  or (orientation: portrait)) {
	.account-wrapper {
		justify-content: center;
	}
}

form {
	display: flex;
	flex-direction: column;
	padding: 0 4rem;
	align-items: center;
	justify-content: center;
	flex-basis: 50%;
	align-self: center;
}
@media (max-width: 58.5625rem) {
	form {
		padding: 0 2rem;
	}
}
@media ((max-width: 48.25em)  or (orientation: portrait)) {
	form {
		flex-basis: 100%;
	}
}

@media (max-width: 28.625rem) {
	form {
		padding-inline: 1.25rem;
	}
}
form label {
	width: 100%;
	margin-bottom: 0.3rem;
	display: block;
}
form input {
	padding: 0.75rem 1rem;
	width: 100%;
	margin-bottom: 2rem;
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
	gap: 1rem;
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
</style>
