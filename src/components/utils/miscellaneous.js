import DOMPurify from 'dompurify';

export const sanitize = ( content ) => {
	return 'undefined' !== typeof window ? DOMPurify.sanitize( content ) : content;
};


export const replaceBackendWithFrontendUrl = ( data ) => {
	if ( ! data || 'string' !== typeof data ) {
		return '';
	}
	
	// First replace all the backend-url with front-end url
	let formattedData = data.replaceAll( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, process.env.NEXT_PUBLIC_SITE_URL );
	
	// Replace only the upload urls for images to back-end url, since images are hosted in the backend.
	return formattedData.replaceAll( `${ process.env.NEXT_PUBLIC_SITE_URL }/wp-content/uploads`, `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-content/uploads` );
}

/*Исправляем дату*/
export const getFormattedDate = ( theDate = '', locales = 'en-us' ) => {
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
	return new Date( theDate ).toLocaleDateString( locales, options );
};

export const getPathNameFromUrl = ( url = '' ) => {
	if ( ! url ) {
		return '';
	}
	const theURL = new URL( url );
	return theURL.pathname;
}

export const smoothScroll = ( targetEl, topOffset = 0, duration = 500 ) => {
	if ( ! targetEl ) {
		return null;
	}
	
	const targetPosition = targetEl.getBoundingClientRect().top - topOffset;
	const startPosition = window.scrollY; // Current height of the window.
	let startTime = null;
	
	const animationCallBack = ( currentTime ) => {
		if ( null === startTime ) {
			startTime = currentTime;
		}
		const timeElapsed = currentTime - startTime;
		const runPosition = getAnimateWithEasePosition( timeElapsed, startPosition, targetPosition, duration );
		
		window.scrollTo( 0, runPosition );
		if ( timeElapsed < duration ) {
			window.requestAnimationFrame( animationCallBack );
		}
	};
	
	window.requestAnimationFrame( animationCallBack );
};

const getAnimateWithEasePosition = ( timeElapsed, startPosition, targetPosition, duration ) => {
	timeElapsed /= duration / 2;
	if ( 1 > timeElapsed ) {
		return ( ( targetPosition / 2 ) * timeElapsed * timeElapsed ) + startPosition;
	}
	timeElapsed--;
	return -( ( targetPosition / 2 ) * ( ( timeElapsed * ( timeElapsed - 2 ) ) - 1 ) ) + startPosition;
};