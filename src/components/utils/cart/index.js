import { getSession, storeSession } from './session';
import { getApiCartConfig } from './api';
import axios from 'axios';
import { COUPON_ENDPOINT } from '@/constants/endpoints';
import { CART_ENDPOINT } from '@/constants/endpoints';
import { isEmpty, isArray } from 'lodash';

/*Функция добавления в корзину. Принимает идентификатор товара и количества.*/ 
export const addToCart = ( productId, qty = 1, setCart, setIsAddedToCart, setLoading ) => {

    /*Сессия для локального хранилища*/
	const storedSession = getSession();
	const addOrViewCartConfig = getApiCartConfig();
	
	setLoading(true);
	
	axios.post( CART_ENDPOINT, {
			product_id: productId,
			quantity: qty,
		},
		addOrViewCartConfig,
	)
		.then( ( res ) => {
			
			if ( isEmpty( storedSession ) ) {
                // ключ сессии
				storeSession( res?.headers?.[ 'x-wc-session' ] );
			}
			setIsAddedToCart(true);
			setLoading(false);
			viewCart( setCart );
		} )
		.catch( err => {
			console.log( 'err', err );
		} );
};

/*Функция просмотра Корзины*/


export const viewCart = ( setCart, setProcessing = () => {} ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	axios.get( CART_ENDPOINT, addOrViewCartConfig )
		.then( ( res ) => {
			const formattedCartData = getFormattedCartData( res?.data ?? [] )
			setCart( formattedCartData );
			setProcessing(false);
		} )
		.catch( err => {
			console.log( 'err', err );
			setProcessing(false);
		} );
};

/**
 * Обновление корзины
 */
export const updateCart = ( cartKey, qty = 1, setCart, setUpdatingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setUpdatingProduct(true);
	
	axios.put( `${CART_ENDPOINT}${cartKey}`, {
		quantity: qty,
	}, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setUpdatingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setUpdatingProduct(false);
		} );
};

/**
 * Delete a cart item Request handler.
 *
 * Deletes all products in the cart of a
 * specific product id ( by its cart key )
 * In a cart session, each product maintains
 * its data( qty etc ) with a specific cart key
 *
 * @param {String} cartKey Cart Key.
 * @param {Function} setCart SetCart Function.
 * @param {Function} setRemovingProduct Set Removing Product Function.
 */
export const deleteCartItem = ( cartKey, setCart, setRemovingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setRemovingProduct(true);
	
	axios.delete( `${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setRemovingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setRemovingProduct(false);
		} );
};


export const clearCart = async ( setCart, setClearCartProcessing ) => {
	
	setClearCartProcessing(true);
	
	const addOrViewCartConfig = getApiCartConfig();
	
	try {
		const response = await axios.delete( CART_ENDPOINT, addOrViewCartConfig );
		viewCart( setCart, setClearCartProcessing );
	} catch ( err ) {
		console.log( 'err', err );
		setClearCartProcessing(false);
	}
};

/**
 * Форматированние данных
 */
const getFormattedCartData = ( cartData ) => {
	if ( ! cartData.length ) {
		return null;
	}
	const cartTotal = calculateCartQtyAndPrice( cartData || [] );
	return {
		cartItems: cartData || [],
		...cartTotal,
	};
};

/**
 * Считаем количество и цену
 */
const calculateCartQtyAndPrice = ( cartItems ) => {
	const qtyAndPrice = {
		totalQty: 0,
		totalPrice: 0,
	}
	
	if ( !isArray(cartItems) || !cartItems?.length ) {
		return qtyAndPrice;
	}
	
	cartItems.forEach( (item, index) => {
		qtyAndPrice.totalQty += item?.quantity ?? 0;
		qtyAndPrice.totalPrice += item?.line_total ?? 0;
	} )
	
	return qtyAndPrice;
}

export const getProductLabel = (quantity) => {
    const word = 'товар';
    const remainder10 = quantity % 10;
    const remainder100 = quantity % 100;

    const ending = /1$/.test(remainder10) && !/11$/.test(remainder100) ? '' :
                   /[2-4]$/.test(remainder10) && !/1[2-4]$/.test(remainder100) ? 'а' :
                   'ов';

    return `${quantity} ${word}${ending}`;
};

const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export const fetchCoupons = async () => {
    try {
        const response = await axios.get(COUPON_ENDPOINT, {
            auth: {
                username: CONSUMER_KEY,
                password: CONSUMER_SECRET
            }
        });

        return response.data; // Возвращаем массив купонов
    } catch (error) {
        console.error("Ошибка при получении купонов:", error.response?.data || error.message);
        return [];
    }
};