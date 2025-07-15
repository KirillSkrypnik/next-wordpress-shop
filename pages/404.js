/**
 * External Link.
 */
import Link from 'next/link';
import axios from 'axios';

/**
 * Internal Link.
 */
import { HEADER_FOOTER_ENDPOINT } from '@/constants/endpoints';
import Layout from '../src/components/layout';

function Error404( { headerFooter } ) {
	return (
		<Layout headerFooter={ headerFooter || {} } seo={ null }>
            <Link legacyBehavior href="/">
                <a className="error-page-link">
                    Back to Home
                </a>
            </Link>
		</Layout>
	);
}

export default Error404;

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
	};
}