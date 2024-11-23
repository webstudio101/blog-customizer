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
	// Обработчик клика вне компонента
	const handleOutsideClick = useCallback(
		(event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				wrapperRef.current &&
				!wrapperRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		},
		[setIsOpen, wrapperRef]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, handleOutsideClick]);
};
