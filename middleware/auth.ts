export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();
	if (!user.value && to.fullPath === "/account/profile") {
		return abortNavigation({
			message: "please login to access this page",
			statusCode: 401,
			statusMessage: "unauthorized",
		});
	}
});
