import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPaginationLinks } from '../utils/pagination';
import cx from 'classnames';
import Previous from './previous';
import Next from './next';

const Pagination = ( { pagesCount, postName } ) => {

	const router = useRouter();
	
	if ( ! pagesCount || ! postName ) {
		return null;
	}
	
	const currentPageNo = parseInt( router?.query?.pageNo ?? 1 ) || 1;
	
	const paginationLinks = createPaginationLinks( currentPageNo, pagesCount );
	
	return (
		<div className="pagination-wrapper">
			
			<Previous currentPageNo={ currentPageNo } postName={ postName }/>
			
			{ paginationLinks.map( ( pageNo, index ) => {
				
				const paginationLink = `/${ postName }/page/${ pageNo }/`;
				
				return (
					'number' === typeof pageNo ? (
						<Link legacyBehavior key={ `id-${ index }` } href={ paginationLink }>
							<a
								className={ cx( 'pagination-link', {
									'is-active pagination-link-active': pageNo === currentPageNo,
								} ) }
							>
								{ pageNo }
							</a>
						</Link>
					) : (
						// If its "..."
						<span key={ `id-${ index }` } className="tocki">{ pageNo }</span>
					)
				);
			} ) }
			<Next currentPageNo={ currentPageNo } pagesCount={ pagesCount } postName={ postName }/>
		</div>
	);
};

Pagination.propTypes = {
	pagesCount: PropTypes.number,
	postName: PropTypes.string,
};

Pagination.defaultProps = {
	pagesCount: 0,
	postName: 'blog',
};

export default Pagination;