import { isEmpty } from 'lodash';
import { addToCart } from '../utils/cart';
import { useContext, useState } from 'react';
import { AppContext } from '../context';
import Link from 'next/link';
import cx from 'classnames';

const AddToCart = ( { product } ) => {

		const { cart, setCart } = useContext( AppContext );
		const [ isAddedToCart, setIsAddedToCart ] = useState( false );
		const [ loading, setLoading ] = useState( false );
    	const addToCartBtnClasses = cx(
    		'duration-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
    		{
    			'bg-white hover:bg-gray-100': ! loading,
    			'bg-gray-200': loading,
    		},
    	);

    if ( isEmpty( product ) ) {
        return null;
    }


    return (
		<>
		<div className='simple-add-to-cart-button-wrapper'>
        	<button
				// className={ addToCartBtnClasses }
				className='simple-add-to-cart-button'
				onClick={ () => addToCart( product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading ) }
				disabled={ loading }
			>
				{ loading ? 'Добавляется' : 'В корзину' }
			</button>
			{ isAddedToCart && ! loading ? (
				<Link legacyBehavior href="/cart">
					<a
						className="added-to-cart link-to-cart"
					>
						Посмотреть корзину
					</a>
				</Link>
			) : null }
		</div>
		</>
    );
}

export default AddToCart;