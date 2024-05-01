export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();
	if (!user.value && to.fullPath === "/success") {
		return navigateTo('/')
	}
    else if(user.value && to.fullPath === "/success"){
        return navigateTo("/");
    }
});
