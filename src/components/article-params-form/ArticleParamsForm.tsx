import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
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
import { useState, useRef, FormEvent } from 'react';

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

	useOpenCloseForm({ isOpen, setIsOpen, wrapperRef });

	const toggleForm = () => setIsOpen((prev) => !prev);

	const updateOption = (key: keyof ArticleStateType) => (value: OptionType) => {
		setOptions((prevState) => ({ ...prevState, [key]: value }));
	};

	const resetOptions = () => {
		setOptions(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const applyOptions = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleStyles(options);
	};

	const asideClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={toggleForm} isContainerOpen={isOpen} />
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
						title='Шрифт'
						onChange={updateOption('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						selected={options.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={updateOption('fontSizeOption')}
					/>
					<Select
						selected={options.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={updateOption('fontColor')}
					/>
					<Separator />
					<Select
						selected={options.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={updateOption('backgroundColor')}
					/>
					<Select
						selected={options.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={updateOption('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
