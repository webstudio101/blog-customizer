//import { useState, useRef } from 'react';
import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	//OptionType,
	ArticleStateType,
	//defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onReset: () => void;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onReset,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localState, setLocalState] = useState<ArticleStateType>(articleState);
	const handleOpen = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleReset = () => {
		setLocalState(articleState);
		onReset();
	};

	const handleApply = () => {
		onApply(localState);
		setIsOpen(false);
	};

	const handleOptionChange = (option: (typeof fontFamilyOptions)[number]) => {
		setLocalState((prevState) => ({
			...prevState,
			fontFamilyOption: option,
		}));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setLocalState((prevState) => ({
			...prevState,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[number]
	) => {
		setLocalState((prevState) => ({
			...prevState,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		setLocalState((prevState) => ({
			...prevState,
			contentWidth: option,
		}));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setLocalState((prevState) => ({
			...prevState,
			fontSizeOption: option,
		}));
	};

	const asideClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			{isOpen && (
				<aside className={asideClassName}>
					<form className={styles.form}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={localState.fontFamilyOption}
							onChange={handleOptionChange}
							title='Шрифт'
						/>

						<RadioGroup
							name='fontSize'
							selected={localState.fontSizeOption}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={handleFontSizeChange}
						/>

						<Select
							selected={localState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет текста'
						/>

						<Separator />

						<Select
							selected={localState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							title='Цвет фона'
						/>

						<Select
							selected={localState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
