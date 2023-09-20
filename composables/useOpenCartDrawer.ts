export const useOpenCartDrawer = () => {
	const isOpen = useState("d", () => false);

	function openCartDrawer() {
		isOpen.value = true;
		console.log(isOpen.value);
		document.body.style.overflow = "hidden";
	}
	function closeCartDrawer() {
		isOpen.value = false;
		console.log(isOpen.value);
		document.body.style.overflow = "visible";
	}
	return {
		closeCartDrawer,
		openCartDrawer,
		isOpen,
	};
};
