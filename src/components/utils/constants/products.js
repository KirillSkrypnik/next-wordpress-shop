const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: 'wc/v3',
} );

/*Получаем товары*/

export const getProductsData = async ( perPage = 50 ) => {
	return await api.get(
		'products',
		{
			per_page: perPage || 50,
		},
	);
};
