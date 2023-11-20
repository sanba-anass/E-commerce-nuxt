export const useSuccessPage = () => {
	const isSuccessPageAccessible = useState(() => false);
	const allowPageAccess = () => {
		isSuccessPageAccessible.value = true;
	};
	const disablePageAccess = () => {
		isSuccessPageAccessible.value = false;
	};
	return {
		isSuccessPageAccessible,
		allowPageAccess,
		disablePageAccess,
	};
};
