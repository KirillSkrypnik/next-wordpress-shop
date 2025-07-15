

import { Fragment } from 'react';
import CheckoutCartItem from "./checkout-cart-item";

const YourOrder = ( { cart } ) => {
	
	return (
		<Fragment>
			{ cart ? (
				<Fragment>
					{/*Product Listing*/}
						<div className="checkout-cart">
							{/* Заголовки */}
							<div className="checkout-cart-header">
								<span className="col-4">Изображение</span>
								<span className="col-4">Товар</span>
								<span className="col-4">Итого</span>
							</div>

							{/* Товары */}
							{cart?.cartItems?.length > 0 && cart.cartItems.map((item, index) => (
								<CheckoutCartItem key={item?.productId ?? index} item={item} />
							))}

							{/* Total */}
							<div className="checkout-cart-total">
								<span className="col-4" />
								<span className="col-4">Итого</span>
								<span className="col-4">
									{cart?.cartItems?.[0]?.currency ?? ''}{cart?.totalPrice ?? ''}
								</span>
							</div>
						</div>
				</Fragment>
			) : '' }
		</Fragment>
	)
};

export default YourOrder;