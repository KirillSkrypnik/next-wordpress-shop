export const HEADER_FOOTER_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const GET_POSTS_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/posts`;
export const GET_POST_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/posts`;
export const GET_PAGES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/pages`;
export const CART_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/cart/items/`;
export const COMMENTS_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wp/v2/comments`;

export const COUPON_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/wc/v3/coupons/`;
export const REG_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/custom/v1/register`;
export const LOGIN_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/login`;


// Countries and States
export const WOOCOMMERCE_COUNTRIES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/countries/`;
export const WOOCOMMERCE_STATES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/states`;