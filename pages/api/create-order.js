const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi( {
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
} );

/**
 * Создание endpoint заказа.
 */
export default async function handler( req, res ) {
	
	const responseData = {
		success: false,
		orderId: '',
		total: '',
		currency: '',
		error: '',
	};
	
	if ( isEmpty( req.body ) ) {
		responseData.error = 'Required data not sent';
		return responseData;
	}
	
	const data = req.body;
	data.status = 'pending';
	data.set_paid = false;
	
	try {
		const { data } = await api.post(
			'orders',
			req.body,
		);
		
		responseData.success = true;
		responseData.orderId = data.number;
		responseData.total = data.total;
		responseData.currency = data.currency;
		responseData.paymentUrl = data.payment_url;
		
		res.json( responseData );
		
	} catch ( error ) {
		console.log( 'error', error );
		/**
		 * Request usually fails if the data in req.body is not sent in the format required.
		 *
		 * @see Data shape expected: https://stackoverflow.com/questions/49349396/create-an-order-with-coupon-lines-in-woocomerce-rest-api
		 */
		responseData.error = error.message;
		res.status( 500 ).json( responseData );
	}
}