export const useNavDrawer = () => {
	const isOpen = useState(() => false);
	const toggleDrawer = () => {
		isOpen.value = !isOpen.value;
		document.body.style.overflow = isOpen.value ? "hidden" : "visible";
	};
	const closeNavDrawer = () => {
		isOpen.value = false;
		document.body.style.overflow = "visible";
	};
	return {
		isOpen,
		toggleDrawer,
		closeNavDrawer,
	};
};
