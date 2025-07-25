import PropTypes from 'prop-types';

const Abbr = ({required}) => {
	if ( !required ) {
		return null;
	}
	
	return <abbr className="text-label" style={{textDecoration: 'none'}} title="required">*</abbr>
}

Abbr.propTypes = {
	required: PropTypes.bool
}

Abbr.defaultProps = {
	required: false
}

export default Abbr