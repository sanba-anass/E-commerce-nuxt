<template>
	<div class="account-wrapper">
		<div v-if="user">
			<h2>You Are In!</h2>

			<div class="buttons">
				<button :disabled="logOutPending" @click="LogOut" class="logout">
					<Spinner v-if="logOutPending" />
					<span v-else>LogOut</span>
				</button>
				<NuxtLink to="/shop?page=1" class="shopping">Go Shopping</NuxtLink>
			</div>
		</div>

		<form v-else @submit.prevent="LogIn">
			<h2>Login</h2>
			<label :class="{ red: formErrors.email }" for="email">{{
				formErrors.email
					? "email provided is not valid please another one"
					: "E-mail"
			}}</label>

			<input
				:class="{ 'border-error': formErrors.email }"
				v-model="email"
				type="email"
				name="email"
				id="email"
			/>

			<label :class="{ red: formErrors.password }" for="password">{{
				formErrors.password
					? "password should be 6 characters long"
					: "password"
			}}</label>

			<input
				:class="{ 'border-error': formErrors.password }"
				v-model="password"
				autocomplete="on"
				type="password"
				name="password"
				id="password"
			/>
			<button :disabled="pending" class="login-button" type="submit">
				<Spinner v-if="pending" />
				<span v-else>Login</span>
			</button>
			<div class="wrapper">
				<div class="checkbox">
					<label for="checkbox">Remember me</label>
					<input type="checkbox" name="checkbox" id="checkbox" />
				</div>
				<NuxtLink to="/account/forgot-password" class="link">
					Forgot Password?
				</NuxtLink>
			</div>
			<button @click="singInWithGoogle" type="button" class="google-button">
				<div><GoogleIcon /> <span class="ms-2"> Connect with Google</span></div>
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
<script setup>
const email = ref("");
const password = ref("");
const pending = ref(false);
const user = useSupabaseUser();
const router = useRouter();
const logOutPending = useLogOutPending();
const supabase = useSupabaseClient();
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
const formErrors = reactive({
	email: false,
	password: false,
});

watch(email, () => {
	if (email.value === "") {
		formErrors.email = false;
		return;
	}
	formErrors.email = !isValidEmail(email.value);
});
watch(password, () => {
	if (password.value === "") {
		formErrors.password = false;
		return;
	}
	formErrors.password = password.value.length < 6;
});
async function LogIn() {
	pending.value = true;
	const { error } = await supabase.auth.signInWithPassword({
		email: email.value.trim(),
		password: password.value,
	});

	if (error) {
		alert(error?.message);
	}
	pending.value = false;
	await refreshNuxtData();
}
const LogOut = async () => {
	logOutPending.value = true;
	const { error } = await supabase.auth.signOut();
	if (error) {
		logOutPending.value = false;
		return;
	}
	logOutPending.value = false;
};
async function singInWithGoogle() {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: "https://e-commerce-nuxt-six.vercel.app/account/success",
		},
	});
	await refreshNuxtData()
}
</script>
<style scoped>
h2 {
	margin-bottom: 2rem;
	text-align: center;
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
	border: 0;
}

.login-button:disabled {
	background: rgb(219, 219, 219);
	color: rgb(104, 104, 104);
	cursor: not-allowed;
}
.red {
	color: red;
}
.border-error {
	border: 1px solid red !important;
}

.google-button {
	background: 0;
	border: 1px solid black;
	padding: 0.75rem 0;
}
.google-button div {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
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
