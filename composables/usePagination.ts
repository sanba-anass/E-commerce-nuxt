export const usePagination = () => {
	const from = useState(() => 0);
	const to = useState(() => 11);
	const size = 12;
	const isVisible = useState(() => true);
	function hidePagination() {
		isVisible.value = false;
	}
	function showPagination() {
		isVisible.value = true;
	}

	function changePage(n: number) {
		from.value = size * (n - 1);
		to.value = n * size - 1;
		console.log(from.value);
		console.log(n);
	}
	const nextPage = () => {
		if (from.value >= 24) {
			return;
		}
		from.value += size;
		to.value += size;
	};
	const previousPage = () => {
		if (from.value <= 0) {
			return;
		}
		from.value -= size;

		to.value -= size;
	};
	return {
		from,
		to,
		nextPage,
		previousPage,
		changePage,
		showPagination,
		hidePagination,
		isVisible
	};
};
