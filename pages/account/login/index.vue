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
	</div>
</template>

<style scoped>
h2 {
	margin-bottom: 1rem;
}
.account-wrapper {
	display: flex;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
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
	align-items: center;
	justify-content: center;
	width: 500px;
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
	padding: 0.75rem 0;
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
@media(max-width:25em){
	 label{
		font-size: 0.9rem;
	}
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
	gap: 0.5rem;
}
form .link {
	text-decoration: underline;
	font-weight: 700;
	cursor: pointer;
}
@media(max-width:25em){
	form .link{
		font-size: 0.9rem;
	}
}
.create-account-link span {
	margin-right: 0.25rem;
	font-weight: 400;
	color: rgb(61, 61, 61);
}
</style>
