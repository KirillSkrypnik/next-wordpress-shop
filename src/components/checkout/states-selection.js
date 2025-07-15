
import PropTypes from 'prop-types';
import {memo} from 'react';
import cx from 'classnames';
import InputField from './form-elements/input-field';
import ArrowDown from "../icons/ArrowDown";
import { useState } from 'react';

import Abbr from "./form-elements/abbr";
import Error from './error';

const StateSelection = ({handleOnChange, input, states, isFetchingStates, isShipping}) => {
	const {state, errors} = input || {};
	const inputId = `state-${isShipping ? 'shipping' : 'billing'}`;

	const [isChanged, setIsChanged] = useState(false);

	const handleFocus  = () => {
		setIsChanged(true);
	}
	
	const handleBlur = () => {
		setIsChanged(false);
	}


	if (isFetchingStates) {
		return (
			<div className="select-wrapper">
				<label className="label-input">
					State/County
					<Abbr required />
				</label>
				<select
					disabled
					value=""
					name="state"
					className="select-loading"
				>
					<option value="">Загрузка...</option>
				</select>
			</div>
		)
	}

	// 🟡 Если нет штатов — показываем обычный input
	if (!states.length) {
		return (
			<InputField
				name="state"
				inputValue={input?.state}
				required
				handleOnChange={handleOnChange}
				label="Область/район"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
		)
	}

	// 🟢 Если есть штаты — показываем select
	return (
		<div className="select-wrapper">
			<label className="label-input" htmlFor={inputId}>
				State/County
				<Abbr required />
			</label>
			<div class="select-wrapper">
				<select
					disabled={isFetchingStates}
					onChange={handleOnChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={state}
					name="state"
					className={cx(
						`select ${isChanged ? 'select-change' : ''}`,
						{ 'opacity-50': isFetchingStates }

					)}
					id={inputId}
				>
					<option value="">Select a state...</option>
					{states.map((state, index) => (
						<option key={state?.stateCode ?? index} value={state?.stateName ?? ''}>
							{state?.stateName}
						</option>
					))}
				</select>
				<span 
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`span ${isChanged ? 'span-change' : ''}`}
				>
					<ArrowDown width={24} height={24} className="fill-current"/>
				</span>
			</div>
			<Error errors={errors} fieldName={'state'} />
		</div>
	)
}

StateSelection.propTypes = {
	handleOnChange: PropTypes.func,
	input: PropTypes.object,
	states: PropTypes.array,
	isFetchingStates: PropTypes.bool,
	isShipping: PropTypes.bool
}

StateSelection.defaultProps = {
	handleOnChange: () => null,
	input: {},
	states: [],
	isFetchingStates: false,
	isShipping: true
}

export default memo(StateSelection);