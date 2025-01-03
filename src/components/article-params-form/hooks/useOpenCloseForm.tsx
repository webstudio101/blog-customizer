import { useCallback, useEffect } from 'react';

type UseOpenCloseFormProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	wrapperRef: React.RefObject<HTMLDivElement>;
};

export const useOpenCloseForm = ({
	isOpen,
	setIsOpen,
	wrapperRef,
}: UseOpenCloseFormProps) => {
	// Click outside handler
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		},
		[setIsOpen, wrapperRef]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		// Remove the handler when unmounting or when the isOpen state changes.
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);
};
