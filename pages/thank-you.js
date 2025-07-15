import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/components/context';
import Layout from '../src/components/layout';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '@/constants/endpoints';
import { clearCart } from '@/components/utils/cart';

function ThankYouContent() {
	const router = useRouter();
	const { orderId } = router.query;
	const [error, setError] = useState(null);
	const [orderData, setOrderData] = useState(null);
	const { cart, setCart } = useContext( AppContext );
	const [ isClearCartProcessing, setClearCartProcessing ] = useState( false );

	useEffect(() => {

	clearCart( setCart, setClearCartProcessing );

	if (orderId) {
		fetch(`/api/get-order?order_id=${orderId}`)
		.then(res => res.json())
		.then(data => {
			if (data.error) {
			setError(data.error);
			} else {
			setOrderData(data);
			}
		})
		.catch(err => {
			console.error(err);
			setError("Произошла ошибка при загрузке заказа.");
		});
	}
	}, [orderId]); 


	if (error) return <p className="error-msg">{error}</p>;

	if (!orderData) return <div className='download-text'>Загрузка заказа...</div>;
	
	const statusMap = {
		pending: 'Ожидает оплаты',
		processing: 'В обработке',
		completed: 'Завершён',
		cancelled: 'Отменён',
		refunded: 'Возвращён',
		failed: 'Ошибка оплаты',
		on_hold: 'На удержании',
		};

	const statusRu = statusMap[orderData?.status] || orderData?.status || 'Неизвестный статус';

	return (
		<div className='page-wrapper'>
			<h1 className='page-title'>🎉 Спасибо за заказ #{orderData.id}</h1>
            <div className='thank-you-wrapper'>
                <p>Статус: <strong>{statusRu}</strong></p>
                <p>Сумма: <strong>{orderData.total} {orderData.currency}</strong></p>
                <p>Покупатель: {orderData.billing?.first_name} {orderData.billing?.last_name}</p>

                <h2>Товары в заказе:</h2>
                <table className="thank-you-table">
                    <thead>
                        <tr>
                            <th>Товар</th>
                            <th>Кол-во</th>
                            <th>Цена за шт.</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.line_items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price} {orderData.currency}</td>
                                <td>{(item.quantity * parseFloat(item.price)).toFixed(2)} {orderData.currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
		</div>
	);
}

// Главный компонент страницы
export default function ThankYou({ headerFooter }) {
	return (
		<Layout headerFooter={headerFooter || {}}>
			<ThankYouContent />
		</Layout>
	);
}

export async function getStaticProps() {
	const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);

	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		revalidate: 1,
	};
}
