<template>
	<div class="account-wrapper">
		<form>
			<h2>Create an Account</h2>
			<label for="name">Full Name</label>

			<input type="email" name="email" id="email" />
			<label for="email">E-mail</label>

			<input type="email" name="email" id="email" />

			<div class="password-inputs">
				<div class="password-input">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" />
				</div>
				<div class="password-input">
					<label for="Confirm Password">Confirm Password</label>
					<input
						type="password"
						name="Confirm Password"
						id="Confirm Password"
					/>
				</div>
			</div>
			<div class="wrapper">
				<div class="checkbox">
					<label for="checkbox">I agree to </label>
					<input type="checkbox" name="checkbox" id="checkbox" />
				</div>
				<NuxtLink class="link"> Terms of Use </NuxtLink>
			</div>
			<button class="login-button" type="submit">Create Account</button>

			<div class="create-account-link">
				<span>Already registered? </span>
				<NuxtLink to="/account/login" class="link"> Login here </NuxtLink>
			</div>
		</form>
		<AccountImage />
	</div>
</template>

<style scoped>
.password-inputs {
	display: flex;
	gap: 1rem;
	width: 100%;
}

.password-input {
	width: 100%;
	flex: 1;
}

.account-wrapper {
	display: flex;
	justify-content: space-between;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
	min-height: calc(100vh - 59px);
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
	font-weight: 500;
	display: block;
	white-space: nowrap;
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
</style>
