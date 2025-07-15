import Link from 'next/link';
// import Image from '../image';
import Image from 'next/image';
import { sanitize } from '../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import Camera from '../../../public/image/camera.png'
// import ExternalLink from './external-link';

const Product = ( { product } ) => {

    if ( isEmpty( product ) ) {
		return null;
	}

	const img = product?.images?.[0] ?? {};
	const productType = product?.type ?? '';

    return (
        <div className='product-item'>
            <Link href={ `/product/${ product?.slug }`} legacyBehavior>
                <div>
					<Image
					src={img?.src ?? '/image/no_image.png'}
					alt={img?.alt ?? ''}
					width={380}
					height={380}
					style={{ width: '100%', height: '100%' }}
					/>
                    <div className='product-info'>
                        <div className='product-title'>
                            { product?.name ?? '' }
                        </div>
						{product?.price_html && (
							<div className='product-price' dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
						)}
                        
                    </div>
                </div>
            </Link>

			{ 'simple' === productType ? <AddToCart product={product}/> : null }
			{/* {
				'external' === productType ?
					<ExternalLink
						url={ product?.external_url ?? '' }
						text={ product?.button_text ?? '' }
					/> : null
			} */}


        </div> 
    );
};

export default Product;