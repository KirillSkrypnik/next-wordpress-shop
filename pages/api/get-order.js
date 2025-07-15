const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

/**
 * Get order by ID
 */
export default async function handler(req, res) {
	const { order_id } = req.query;

	if (!order_id) {
		return res.status(400).json({ error: 'Missing order_id' });
	}

	try {
		const { data } = await api.get(`orders/${order_id}`);
		res.status(200).json(data);
	} catch (error) {
		console.error('Failed to fetch order:', error.message);
		res.status(500).json({ error: 'Failed to fetch order', details: error.message });
	}
}

