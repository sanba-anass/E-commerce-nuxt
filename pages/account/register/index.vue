<template>
	<div class="account-wrapper">
		<form @submit.prevent="createAccount">
			<h2>Create an Account</h2>
			<div class="input-wrapper">
				<label :class="{ red: formErrors.fullName }" for="name">{{
					formErrors.fullName
						? "fullname should be more than 8 characters"
						: "FullName"
				}}</label>
				<input
					:class="{ 'error-border': formErrors.fullName }"
					required
					v-model="fullName"
					type="text"
					name="name"
					id="name"
				/>
			</div>

			<div class="input-wrapper">
				<label :class="{ red: formErrors.email }" for="email">{{
					formErrors.email
						? "email provided is not valid please another one"
						: "E-mail"
				}}</label>
				<input
					:class="{ 'error-border': formErrors.email }"
					required
					v-model="email"
					type="email"
					name="email"
					id="email"
					autocomplete="username"
				/>
			</div>

			<div class="password-inputs">
				<div class="password-input">
					<label :class="{ red: formErrors.password }" for="password">{{
						formErrors.password
							? "password should be 6 characters long"
							: "password"
					}}</label>
					<input
						:class="{ 'error-border': formErrors.password }"
						required
						v-model="password"
						autocomplete="new-password"
						type="password"
						name="password"
						id="password"
					/>
				</div>
				<div class="password-input">
					<label
						:class="{ red: formErrors.confirmPassword }"
						for="Confirm Password"
						>{{
							formErrors.confirmPassword
								? "this does not match your password"
								: "Confirm Password"
						}}</label
					>
					<input
						:class="{ 'error-border': formErrors.confirmPassword }"
						required
						v-model="confirmPassword"
						autocomplete="new-password"
						type="password"
						name="Confirm Password"
						id="Confirm Password"
					/>
				</div>
			</div>
			<div class="wrapper">
				<div class="checkbox">
					<label for="checkbox">I agree to </label>
					<input
						:class="{ 'error-border': formErrors.agree }"
						required
						v-model="agree"
						type="checkbox"
						name="checkbox"
						id="checkbox"
					/>
				</div>
				<NuxtLink class="link"> Terms of Use </NuxtLink>
			</div>
			<button :disabled="pending" class="login-button" type="submit">
				<Spinner v-if="pending" />
				<span v-else>Create Account</span>
			</button>

			<div class="create-account-link">
				<span>Already registered? </span>
				<NuxtLink to="/account/login" class="link"> Login here </NuxtLink>
			</div>
		</form>
	</div>
</template>
<script setup>
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const agree = ref(false);
const pending = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter()

const formErrors = reactive({
	email: false,
	fullName: false,
	password: false,
	confirmPassword: false,
	agree: false,
});
watch(email, () => {
	if (email.value === "") {
		formErrors.email = false;
		return;
	}
	formErrors.email = !isValidEmail(email.value);
});
watch(fullName, () => {
	if (fullName.value === "") {
		formErrors.fullName = false;
		return;
	}
	formErrors.fullName = fullName.value.length < 8;
});
watch(password, () => {
	if (password.value === "") {
		formErrors.password = false;
		return;
	}
	formErrors.password = password.value.length < 6;
	formErrors.confirmPassword = confirmPassword.value !== password.value;
});
watch(confirmPassword, () => {
	if (confirmPassword.value === "") {
		formErrors.confirmPassword = false;
		return;
	}
	formErrors.confirmPassword = confirmPassword.value !== password.value;
});
watch(agree, () => {
	if (!agree.value) {
		formErrors.agree = false;
		return;
	}
	formErrors.agree = !agree.value;
});

const createAccount = async () => {
	if (
		formErrors.email ||
		formErrors.confirmPassword ||
		formErrors.fullName ||
		formErrors.password
	) {
		alert("some values are not correct");
		return;
	}
	pending.value = true;
	const { error } = await supabase.auth.signUp({
		email: email.value.trim(),
		password: password.value,
	});
	if (error?.message === "User already registered") {
		pending.value = false;

		alert(error.message);
	}
	if (error && error?.message !== "User already registered") {
		console.log(error?.message);
		alert("unexpected error please try again!");
		pending.value = false;

		return;
	}
	pending.value = false;
	await refreshNuxtData();
    router.push('/account/profile')
	await supabase.from("users").insert({
		full_name: fullName.value.trim(),
		id: user.value.id,
	});
};
</script>
<style scoped>
.user_info {
	text-align: center;
	margin-bottom: 2rem;
}
.user_info .email {
	margin-bottom: 0.5rem;
}
h2 {
	margin-bottom: 2rem;
	text-align: center;
}
.password-inputs {
	display: flex;
	gap: 1rem;
	width: 100%;
}
@media (max-width: 38.75rem) {
	.password-inputs {
		display: block;
	}
}
.password-inputs input {
	width: 100%;
}
.input-wrapper {
	width: 100%;
	position: relative;
}
.error-border {
	border: 1.25px solid red !important;
}
.red {
	color: red;
}

.password-input {
	width: 100%;
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
	align-items: center;
	justify-content: center;
	position: relative;
	width: 550px;
}

@media (max-width: 34.9375em) {
	form {
		width: 100%;
		padding-inline: 1.5rem;
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
@media (max-width: 37.5em) {
	form label {
		white-space: initial;
	}
}
form input {
	padding: 0.65rem 1rem;
	margin-bottom: 1.5rem;
	border: 1px solid rgb(73, 73, 73);
}
form input:focus {
	outline: 0px;
	border: 1.5px dashed;

	background-color: rgb(248, 248, 248);
}
input[type="email"],
input[name="name"] {
	width: 100%;
}
input[type="password"],
input[name="Confirm Password"] {
	width: 100%;
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
	border: 0;
}
.login-button:disabled {
	background: rgb(219, 219, 219);
	color: rgb(104, 104, 104);
	cursor: not-allowed;
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
@media (max-width: 25em) {
	label {
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
	width: 100%;
	margin-bottom: 2rem;
}
form .link {
	text-decoration: underline;
	font-weight: 700;
	cursor: pointer;
}
@media (max-width: 25em) {
	form .link {
		font-size: 0.9rem;
	}
}
.create-account-link span {
	margin-right: 0.25rem;
	font-weight: 400;
	color: rgb(61, 61, 61);
}
.logout {
	all: unset;
	border: 1px solid black;
	height: 50px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
}
.logout:disabled {
	cursor: not-allowed;
	opacity: 0.55;
}
.buttons {
	display: flex;
	gap: 1rem;
}
.shopping {
	all: unset;
	background: black;
	height: 50px;
	cursor: pointer;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
}
</style>
