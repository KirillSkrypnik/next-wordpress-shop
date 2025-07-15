import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext([
	{},
	() => {}
]);

export const AppProvider = ( props ) => {
	
	const [ cart, setCart ] = useState( null );

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formType, setFormType] = useState('login');
	const [user, setUser] = useState(null);
	
	/**
	 * Это будет вызвано один раз при начальной загрузке (монтирование компонента).
	 *
	 * Устанавливает данные корзины из localStorage в `cart` в контексте.
	 */
	useEffect( () => {
		
		if ( process.browser ) {
			let cartData = localStorage.getItem( 'next-cart' );
			// Данные пользователя
			const storedUser = localStorage.getItem('currentUser');
			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
			cartData = null !== cartData ? JSON.parse( cartData ) : '';
			setCart( cartData );
		}
		
	}, [] );
	
	/**
     *   1. Когда вызывается setCart(), который изменяет значение 'cart', это установит новые данные в localStorage.
	 *
	 *   2.'cart' в любом случае будет иметь новые данные, так как setCart()
	 */
	useEffect( () => {

		if ( process.browser ) {
			localStorage.setItem('next-cart', JSON.stringify(cart));
		}

	}, [ cart ] );

	const contextValue = {
		cart,
		setCart,
		isModalOpen,
		setIsModalOpen,
		formType,
		setFormType,
		user,      
		setUser,
	};
	
	return (
		<AppContext.Provider value={contextValue}>
			{ props.children }
		</AppContext.Provider>
	);
};