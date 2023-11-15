export const useProductDrawer = () => {
	const isDrawerOpen = useState("product", () => false);
	const productId = useState<string | null>(() => null);
	const favId = useState<string | null>(() => null);
	function openProductDrawer() {
		isDrawerOpen.value = true;
		document.body.style.overflow = "hidden";
	}
	function closeProductDrawer() {
		isDrawerOpen.value = false;
		document.body.style.overflow = "visible";
	}
	return {
		closeProductDrawer,
		openProductDrawer,
		isDrawerOpen,
		productId,
		favId,
	};
};
