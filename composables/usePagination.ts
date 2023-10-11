export const usePagination = () => {
	const from = useState(() => 0);
	const to = useState(() => 11);
	const size = 12;

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
		console.log(from.value + "," + to.value + "next");
	};
	const previousPage = () => {
		if (from.value <= 0) {
			return;
		}
		from.value -= size;

		to.value -= size;

		console.log(from.value + "," + to.value + "previous");
	};
	return { from, to, nextPage, previousPage, changePage };
};
