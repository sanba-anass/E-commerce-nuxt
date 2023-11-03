export default defineNuxtRouteMiddleware((to, from) => {
	const route = useRoute();
	const { changePage } = usePagination();

	changePage(parseInt(route.query?.page as string));
});
