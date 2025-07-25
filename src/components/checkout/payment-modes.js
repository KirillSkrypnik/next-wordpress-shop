import Error from "./error";

const PaymentModes = ( { input, handleOnChange } ) => {
	
	const { errors, paymentMethod } = input || {}
	
	return (
		<div className="payment-wrapper">
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			{/*Direct bank transfers*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="bacs" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'bacs' === paymentMethod}/>
					<span className="woo-next-payment-content">Direct Bank Transfer</span>
				</label>
			</div> */}
			{/*Pay with Paypal*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="paypal" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'paypal' === paymentMethod}/>
					<span className="woo-next-payment-content">Pay with Paypal</span>
				</label>
			</div> */}
			{/*Check Payments*/}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cheque" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'cheque' === paymentMethod}/>
					<span className="woo-next-payment-content">Check Payments</span>
				</label>
			</div> */}
			{/*Pay with Stripe*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cod" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'cod' === paymentMethod}/>
					<span className="woo-next-payment-content">Оплата при получении</span>
				</label>
			</div>
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="jccpaymentgatewayredirect" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'jccpaymentgatewayredirect' === paymentMethod}/>
					<span className="woo-next-payment-content">JCC</span>
				</label>
			</div> */}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="ccavenue" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'ccavenue' === paymentMethod}/>
					<span className="woo-next-payment-content">CC Avenue</span>
				</label>
			</div> */}
			{/* <div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="stripe" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'stripe' === paymentMethod}/>
					<span className="woo-next-payment-content">Stripe</span>
				</label>
			</div> */}
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
				Дополнительное сообщение
			</div>
		</div>
	);
};

export default PaymentModes;