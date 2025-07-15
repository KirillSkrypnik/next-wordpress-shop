import Img from 'next/image';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { DEFAULT_IMG_URL } from '../utils/constants/images';


/*Компонент изображения*/

const Image = ( props ) => {
	const {altText, title, width, height, sourceUrl, className, layout, objectFit, containerClassNames, showDefault, ...rest} = props;
	
	if ( ! sourceUrl && ! showDefault ) {
		return null;
	}
	
	if ( 'fill' === layout ) {
		const attributes = {
			alt: altText || title,
			src: sourceUrl || ( showDefault ? DEFAULT_IMG_URL : '' ),
			layout: 'fill',
			className: cx( 'object-cover', className ),
			...rest
		};
		
		return (
			<div className={cx( 'page-image', containerClassNames ) }>
				<Img {...attributes}/>
			</div>
		);
	} else {
		const attributes = {
			alt: altText || title,
			src: sourceUrl || ( showDefault ? DEFAULT_IMG_URL : '' ),
			width: width || 'auto',
			height: height || 'auto',
			className,
			...rest
		};
		return <Img {...attributes} />;
	}
};

Image.propTypes = {
	altText: PropTypes.string,
	title: PropTypes.string,
	sourceUrl: PropTypes.string,
	layout: PropTypes.string,
	showDefault: PropTypes.bool,
	containerClassName: PropTypes.string,
	className: PropTypes.string
};

Image.defaultProps = {
	altText: '',
	title: '',
	sourceUrl: '',
	showDefault: true,
	containerClassNames: '',
	// className: 'product__image',
};

export default Image;