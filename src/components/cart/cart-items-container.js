import React, { useContext, useState } from 'react';
import { AppContext } from '../context';
import CartItem from './cart-item';
import Image from 'next/image';
import Link from 'next/link';
import { clearCart } from '../utils/cart';
import { getProductLabel } from '../utils/cart';
import { fetchCoupons  } from '../utils/cart';

fetchCoupons().then(coupons => console.log("Купоны:", coupons));

const CartItemsContainer = () => {
	const { cart, setCart } = useContext( AppContext );
	const { cartItems, totalPrice, totalQty } = cart || {};
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );
	
	// Clear the entire cart.
	const handleClearCart = async ( event ) => {
		event.stopPropagation();
		
		if (isClearCartProcessing) {
			return;
		}
		
		await clearCart( setCart, setClearCartProcessing );


	};
	
	return (
		<div className="content-wrap-cart">
			{ cart ? (
				<div className="content-wrap-cart-items">
					{/*Cart Items*/ }
					<div className="content-wrap-cart-products">
					<div className='content-wrap-cart-top'>
                        <div className="content-wrap-cart-products-title">Корзина</div>
						{/*Очистка корзины*/}
							<button
								className="clear-cart"
								onClick={(event) => handleClearCart(event)}
								disabled={isClearCartProcessing}
							>
								<span className="woo-next-cart">{!isClearCartProcessing ? "Очистить" : "Очистка..."}</span>
							</button>
					</div>
						{ cartItems.length &&
						cartItems.map( ( item ) => (
							<CartItem
								key={ item.product_id }
								item={ item }
								products={ cartItems }
								setCart={setCart}
							/>
						) ) }
					</div>
					
					{/*Cart Total*/ }
					<div className="cart-total">
						<div className='content-wrap-cart-products-title'>Оплата</div>
						<div className="cart-total-table">
							<div className="cart-total-table-left">
								<div className='cart-total-table-left-string'>Ваш заказ</div>
								<div className='cart-total-table-left-string'>Товары</div>
								<div className='cart-total-table-left-string'>Скидки</div>
								<div className='cart-total-table-left-string'>Промокоды</div>
								<div className='cart-total-table-left-string'>Спец. предложения</div>
							</div>
							<div className='cart-total-table-right'>
								<div className='cart-total-table-right-string'>
									{getProductLabel(totalQty)}
								</div>
								<div className='cart-total-table-right-string'>
								{ totalPrice } {cartItems?.[0]?.currency ?? ''}
								</div>
								<div className='cart-total-table-right-string'>
								0 {cartItems?.[0]?.currency ?? ''}
								</div>
								<div className='cart-total-table-right-string'>
								0 {cartItems?.[0]?.currency ?? ''}
								</div> 
								<div className='cart-total-table-right-string'>
								0 {cartItems?.[0]?.currency ?? ''}
								</div>
							</div>
						</div>
						
						<div className="">
							{/*Checkout*/}
							<Link href="/checkout" legacyBehavior>
								<button className="proceed-to-checkout">
			                  <span className="">
			                    Перейти к оплате
			                  </span>
									<i className=""/>
								</button>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="empty-cart-wrapper">
					<div className='empty-cart-wrapper-left'>
						<Image 
							src="/image/emptyBasketLeft.webp"
							alt="Пустая корзина"
							width={554} // укажи реальные размеры или размер, подходящий для твоего макета
							height={593}
						/>
					</div>
					<div className='empty-cart-wrapper-middle'>
						<h2>Ваша корзина пуста</h2>
						<div className='empty-cart-wrapper-text'>
							Ваша корзина пуста, откройте каталог и выбирайте лучшее из тысячи товаров с быстрой доставкой
						</div>
						<Link href="/" legacyBehavior>
							<button className="button back-to-shop">
							<span className="woo-next-cart-checkout-txt">
								В каталог
							</span>
								<i className="fas fa-long-arrow-alt-right"/>
							</button>
						</Link>
					</div>
					<div className='empty-cart-wrapper-right'>
						<Image 
							src="/image/emptyBasketRight.webp"
							alt="Пустая корзина"
							width={586} // укажи реальные размеры или размер, подходящий для твоего макета
							height={643}
						/>
					</div>
				</div>
			) }
		</div>
	);
};

export default CartItemsContainer;