export const useOpenCartDrawer = () => {
	const isDrawerOpen = useState("cart", () => false);

	function openCartDrawer() {
		isDrawerOpen.value = true;
		document.body.style.overflow = "hidden";
	}
	function closeCartDrawer() {
		isDrawerOpen.value = false;
		document.body.style.overflow = "visible";
	}
	return {
		closeCartDrawer,
		openCartDrawer,
		isDrawerOpen,
	};
};
