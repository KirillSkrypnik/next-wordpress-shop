import { isArray, isEmpty } from 'lodash';
// import { createCheckoutSession } from 'next-stripe/client'; // @see https://github.com/ynnoj/next-stripe
// import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { createTheOrder, getCreateOrderData } from './order';
import { clearCart } from '../cart';
import axios from 'axios';
import { WOOCOMMERCE_STATES_ENDPOINT } from '@/constants/endpoints';

export const handleOtherPaymentMethodCheckout = async ( input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData, setClearCartProcessing ) => {
	setIsOrderProcessing( true );

	const orderData = getCreateOrderData( input, products );

	const customerOrderData = await createTheOrder( orderData, setRequestError, '' );

	const cartCleared = await clearCart(setCart, setClearCartProcessing);
	
	setIsOrderProcessing( false );

	if ( isEmpty( customerOrderData?.orderId ) || cartCleared?.error ) {
		setRequestError( 'Clear cart failed' );
		console.log('Clear cart failed');

		return {
			paymentUrl: null,
			error: 'Clear cart failed',
		};
	}

	setCreatedOrderData( customerOrderData );

	// Убедись, что paymentUrl действительно существует
	return {
		orderId: customerOrderData?.orderId ?? null,
		paymentUrl: customerOrderData?.paymentUrl ?? null,
		error: null,
	};
};



const createCheckoutSessionAndRedirect = async ( products, input, orderId ) => {
	const thankYouUrl = `/thank-you?order_id=${ orderId }`;
	window.location.href = thankYouUrl;
};

export const handleBillingDifferentThanShipping = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.billingDifferentThanShipping };
	setInput( newState );
};

export const handleCreateAccount = ( input, setInput, target ) => {
	const newState = { ...input, [ target.name ]: ! input.createAccount };
	setInput( newState );
};


export const setStatesForCountry = async ( target, setTheStates, setIsFetchingStates ) => {
	if ( 'country' === target.name ) {
		setIsFetchingStates( true );
		const countryCode = target[ target.selectedIndex ].getAttribute( 'data-countrycode' );
		const states = await getStates( countryCode );
		setTheStates( states || [] );
		setIsFetchingStates( false );
	}
};

export const getStates = async ( countryCode = '' ) => {
	
	console.log('Загружаем штаты для страны:', countryCode);
	if ( ! countryCode ) {
		return [];
	}
	
	const { data } = await axios.get( WOOCOMMERCE_STATES_ENDPOINT, { params: { countryCode } } );
	
	return data?.states ?? [];
};