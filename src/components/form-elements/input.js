import Error from './error';
import PropTypes from 'prop-types';
import Abbr from './abbr';

const Input = ( {
	                     handleOnChange,
	                     inputValue,
	                     name,
	                     type,
	                     label,
	                     errors,
	                     placeholder,
	                     required,
	                     containerClassNames,
	                     inputId,
                     } ) => {
	
	return (
		<div className={ containerClassNames }>
			<label className="comment-form-label" htmlFor={ inputId }>
				{ label || '' }
				{console.log(label,'label')}
				<Abbr required={ required }/>
			</label>
			<input
				onChange={ handleOnChange }
				value={ inputValue || '' }
				placeholder={ placeholder || '' }
				type={ type || 'text' }
				name={ name || '' }
				className="input-form"
				id={ inputId || name }
			/>
			<Error errors={ errors } fieldName={ name }/>
		</div>
	);
};

Input.propTypes = {
	handleOnChange: PropTypes.func,
	inputValue: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string,
};

Input.defaultProps = {
	handleOnChange: () => null,
	inputValue: '',
	name: '',
	type: 'text',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: '',
};

export default Input;