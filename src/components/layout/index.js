import Head from 'next/head';
import { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Modal from '../modal';
import Seo from '../seo';
import { AppProvider } from '../context';
import { replaceBackendWithFrontendUrl, sanitize } from '../utils/miscellaneous';
import { useRouter } from 'next/router';



const Layout = ({ children, headerFooter, seo, uri }) => {
    const { header, footer } = headerFooter || {};
    const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;
    const is404 = useRouter();
    return (
        <AppProvider>
        <div className='all-page-wrapper'>
            <Seo seo={ seo || {} } uri={ uri || ''} />
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href={ header?.favicon ?? '/favicon.ico' }/>
                {
                    yoastSchema ?
                        ( <script
                            type="application/ld+json"
                            className="yoast-schema-graph"
                            key="yoastSchema"
                            dangerouslySetInnerHTML={ { __html: sanitize( yoastSchema ) } }
                        /> ) :
                        <title>{ header?.siteTitle ?? 'Nexts WooCommerce' }</title>
                }
            </Head>
            <Header header={header} />
            <main className={is404.pathname == '/404' ? 'error-page-wrapper' : ''}>
                <div className='container'>
                    {children}
                </div>
            </main>
            <Footer footer={footer} header={header}/> 
            <Modal />

        </div>
        </AppProvider>
    );
};

export default Layout;
