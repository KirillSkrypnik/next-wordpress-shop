import Image from '../image';
import { isEmpty } from 'lodash';

const CheckoutCartItem = ( { item } ) => {
	
	const productImg = item?.data?.images?.[0] ?? '';
	
	return (
		<div className="woo-next-cart-item" key={ item?.productId ?? '' }>
			<div className="woo-next-cart-element woo-next-cart-checkout">
				<figure >
					<Image
						width="150"
						height="150"
						alt={productImg?.alt ?? ''}
						sourceUrl={! isEmpty( productImg?.src ) ? productImg?.src : ''} // use normal <img> attributes as props

					/>
				</figure>
			</div>
			<div className="woo-next-cart-element">{ item?.data?.name ?? '' }</div>
			<div className="woo-next-cart-element">{item?.currency ?? ''}{item?.line_subtotal ?? ''}</div>
		</div>
	)
};

export default CheckoutCartItem;