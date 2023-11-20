<template>
	<div class="account-wrapper">
		<Spinner v-if="fullName === '' || fullName === null || !user" />
		<div v-else class="user_info">
			<p class="email">
				Email:
				{{ user?.email ?? user?.user_metadata?.email }}
			</p>
			<p class="username">
				Name:
				{{ fullName }} {{ user?.user_metadata?.full_name }}
			</p>
		</div>
		<div class="buttons">
			<button :disabled="logOutPending" @click="LogOut" class="logout">
				<Spinner v-if="logOutPending" />
				<span v-else>LogOut</span>
			</button>
			<NuxtLink to="/shop?page=1" class="shopping">Go Shopping</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware:['auth']
})	
const router = useRouter();
const logOutPending = useLogOutPending();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const fullName = ref("");
onMounted(async () => {
	const { data } = await supabase
		.from("users")
		.select("*")
		.eq("id", user?.value?.id);
	fullName.value = data[0]?.full_name;
});

const LogOut = async () => {
	logOutPending.value = true;
	const { error } = await supabase.auth.signOut();
	if (error) {
		logOutPending.value = false;
		return;
	}
	logOutPending.value = false;
	await refreshNuxtData();
	user.value = null;
	router.push("/account/login");
};
onMounted(async () => await refreshNuxtData());
</script>

<style scoped>
.user_info {
	text-align: center;
	margin-bottom: 2rem;
}
.user_info .email {
	margin-bottom: 0.5rem;
}
.account-wrapper {
	display: flex;
	flex-direction: column;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 58px);
	gap: 2rem;
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
