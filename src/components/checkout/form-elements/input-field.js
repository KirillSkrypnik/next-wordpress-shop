import Error from "../error";
import PropTypes from 'prop-types';
import Abbr from "./abbr";

const InputField = ({ handleOnChange, inputValue, name, type, label, errors, placeholder, required, containerClassNames, isShipping }) => {

	const inputId = `${name}-${isShipping ? 'shipping' : ''}`;

	return (
		<div className={containerClassNames}>
			<label className="label-input" htmlFor={inputId}>
				{ label || '' }
				<Abbr required={required}/>
			</label>
			<input
				onChange={ handleOnChange }
				value={ inputValue }
				placeholder={placeholder}
				type={type}
				name={name}
				className="checkout-input"
				id={inputId}
			/>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	)
}

InputField.propTypes = {
	handleOnChange: PropTypes.func,
	inputValue: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string
}

InputField.defaultProps = {
	handleOnChange: () => null,
	inputValue: '',
	name: '',
	type: 'text',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: ''
}

export default InputField;