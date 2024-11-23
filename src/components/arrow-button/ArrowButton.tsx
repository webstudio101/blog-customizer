import arrow from 'src/images/arrow.svg';
import { clsx } from 'clsx';
import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isContainerOpen: boolean;
};

export const ArrowButton = ({ onClick, isContainerOpen }: ArrowButtonProps) => {
	const imageClassName = clsx(styles.arrow, {
		[styles.arrow_open]: isContainerOpen,
	});

	const containerClassName = clsx(styles.container, {
		[styles.container_open]: isContainerOpen,
	});

	return (
		<button
			aria-label='Открыть/Закрыть форму'
			className={containerClassName}
			onClick={onClick}>
			<img src={arrow} alt='icon' className={imageClassName} />
		</button>
	);
};
