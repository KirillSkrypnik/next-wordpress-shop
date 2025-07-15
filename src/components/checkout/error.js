const Error = ( { errors, fieldName } ) => {
	
	return(
		errors && ( errors.hasOwnProperty( fieldName ) ) ? (
			<div className="error">{ errors[fieldName] }</div>
		) : ''
	)
};

export default Error;