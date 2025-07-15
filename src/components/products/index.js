import { isArray, isEmpty } from 'lodash';
import Product from './product';

const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	
	return (
		<div className="products_wrapper">
			
			{ products.length ? products.map( product => {
				return (
					<Product key={ product?.id } product={product} />
				)
			} ) : null }
		
		</div>
	)
}

export default Products;