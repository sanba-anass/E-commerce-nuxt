export const useDialog = () => {
	const isOpen = useState(() => false);
	const title = useState(() => "Dialog Title");
	const content = useState(() => "Dialog content goes here.");

	const openDialog = (dialogTitle: string, dialogContent: string) => {
		isOpen.value = true;
		title.value = dialogTitle;
		content.value = dialogContent;
	};

	const closeDialog = () => {
		isOpen.value = false;
	};
	return {
		closeDialog,
		openDialog,
		isOpen,
		title,
		content,
	};
};
