export const useScrollToTop = () => {
	const drawerContentRef = useState(() => null);
	function ScrollToTop() {
		drawerContentRef?.value?.scrollTo({
			top: 0,
		});
	}
	return {
		drawerContentRef,
		ScrollToTop,
	};
};
