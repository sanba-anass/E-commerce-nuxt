<template>
	<div class="account-wrapper" v-if="user">
		<h2>You Are In!</h2>
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
const user = useSupabaseUser();
const logOutPending = useLogOutPending();
const supabase = useSupabaseClient();
const LogOut = async () => {
	logOutPending.value = true;
	const { error } = await supabase.auth.signOut();
	if (error) {
		logOutPending.value = false;
		return;
	}
	logOutPending.value = false;
	await refreshNuxtData();
};
</script>

<style scoped>
.account-wrapper {
	display: flex;
	max-width: 105rem;
	margin: 0 auto;
	width: 100%;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 58px);
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
