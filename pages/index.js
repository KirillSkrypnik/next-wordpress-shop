// pages/index.js
import { HEADER_FOOTER_ENDPOINT } from '@/constants/endpoints';

import Layout from '@/components/layout';
import axios from 'axios';
import { getProductsData } from '../src/components/utils/constants/products'
import Products from '@/components/products';

export default function HomePage({ headerFooter, products  }) {
  return (
    <>
      <Layout headerFooter={headerFooter}>
        <div className='container'>
          <Products  products={products} />
        </div>
        </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
  const { data: products } = await getProductsData();

  return {
    props: {
      headerFooter: headerFooterData?.data ?? {},
      products: products ?? {}
    },
    revalidate: 1,
  };
}
