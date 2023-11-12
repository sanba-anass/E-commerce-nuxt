export const useToast = (duration: number) => {
	const isOpen = useState(() => false);
	const progress = useState(() => 0);
	const isFavouriteItem = useState(() => true);
	const toastId = useState(() => null);
	const products = useProductList();

	const open = () => {
		isOpen.value = true;
		progress.value = 0;

		const timer = setInterval(() => {
			progress.value += 100 / duration;

			if (progress.value >= 105) {
				clearInterval(timer);
				close();
			}
		}, 100);
	};
	const close = () => {
		isOpen.value = false;
		progress.value = 0;
	};

	return { close, open, progress, isOpen, toastId, isFavouriteItem };
};
