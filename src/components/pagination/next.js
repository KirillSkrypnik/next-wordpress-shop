import { isEmpty } from 'lodash';
import Link from 'next/link';

const Next = ( { currentPageNo, pagesCount, postName } ) => {
	
	if ( ! currentPageNo || ! pagesCount || isEmpty( postName ) ) {
		return null;
	}
	
	// If you are on the last page, don't show next link.
	if ( pagesCount < currentPageNo + 1 ) {
		return null;
	}
	
	const paginationLink = `/${ postName }/page/${ currentPageNo + 1 }/`;
	
	return (
		<Link legacyBehavior href={ paginationLink }>
			<a className="next-button pagination-button">Next</a>
		</Link>
	);
};

export default Next;