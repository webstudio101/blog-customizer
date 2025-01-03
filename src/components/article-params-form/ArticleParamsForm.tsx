import { useState, useRef, FormEvent, useCallback } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOpenCloseForm } from './hooks/useOpenCloseForm';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	articleStyles: ArticleStateType;
	setArticleStyles: (articleStyles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleStyles,
	setArticleStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState(articleStyles);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	// Hook to handle opening and closing the form
	useOpenCloseForm({ isOpen, setIsOpen, wrapperRef });

	// Toggle form open/close state
	const toggleForm = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	// Update individual option
	const updateOption = useCallback(
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setOptions((prevState) => ({ ...prevState, [key]: value }));
		},
		[]
	);

	// Reset all options to default
	const resetOptions = useCallback(() => {
		setOptions(defaultArticleState);
		setArticleStyles(defaultArticleState);
	}, [setArticleStyles]);

	// Apply current options
	const applyOptions = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			setArticleStyles(options);
		},
		[options, setArticleStyles]
	);

	// Dynamic class for the aside element
	const asideClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside className={asideClassName}>
				<form
					className={styles.form}
					onSubmit={applyOptions}
					onReset={resetOptions}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={options.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateOption('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						onChange={updateOption('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={options.fontColor}
						options={fontColors}
						onChange={updateOption('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={options.backgroundColor}
						options={backgroundColors}
						onChange={updateOption('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={options.contentWidth}
						options={contentWidthArr}
						onChange={updateOption('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
