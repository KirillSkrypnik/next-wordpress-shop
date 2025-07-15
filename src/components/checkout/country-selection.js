import Error from './error';
import {isEmpty, map} from "lodash";
import Abbr from "./form-elements/abbr";
import ArrowDown from "../icons/ArrowDown";
import { useState } from 'react';

const CountrySelection = ({input, handleOnChange, countries, isShipping}) => {
	
	const {country, errors} = input || {};
	
	const inputId = `country-${isShipping ? 'shipping' : 'billing'}`;

	const [isChanged, setIsChanged] = useState(false);

	const handleFocus  = () => {
		setIsChanged(true);
	}
	
	const handleBlur = () => {
		setIsChanged(false);
	}
	
	return (
		<div className="select-wrapper">
			<label className="label-input" htmlFor={inputId}>
				Страна
				<Abbr required/>
			</label>
			<div className="select-wrapper">
				<select
					onChange={handleOnChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={country}
					name="country"
					className={`select ${isChanged ? 'select-change' : ''}`}
					id={inputId}
				>
					<option value="">Выберите страну...</option>
					{!isEmpty(countries) &&
					map(countries, (country) => (
						<option key={country?.countryCode} data-countrycode={country?.countryCode}
						        value={country?.countryCode}>
							{country?.countryName}
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
			<Error errors={errors} fieldName={'country'}/>
		</div>
	);
}

export default CountrySelection;