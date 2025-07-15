import PropTypes from 'prop-types';
import CountrySelection from "./country-selection";
import StateSelection from "./states-selection";
import InputField from "./form-elements/input-field";

const Address = ({input, countries, states, handleOnChange, isFetchingStates, isShipping}) => {
	
	const {errors} = input || {};
	
	return (
		<>
			<div className="checkout-form-name">
				<InputField
					name="firstName"
					inputValue={input?.firstName}
					required
					handleOnChange={handleOnChange}
					label="Имя"
					errors={errors}
					isShipping={isShipping}
					containerClassNames="input-wrapper"
				/>
				<InputField
					name="lastName"
					inputValue={input?.lastName}
					required
					handleOnChange={handleOnChange}
					label="Фамилия"
					errors={errors}
					isShipping={isShipping}
					containerClassNames="input-wrapper"
				/>
			</div>
            <div class="checkout-form-info">

			<InputField
				name="company"
				inputValue={input?.company}
				handleOnChange={handleOnChange}
				label="Название компании (необязательно)"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
			{/* Country Selection*/}
			<CountrySelection
				input={input}
				handleOnChange={handleOnChange}
				countries={countries}
				isShipping={isShipping}
			/>
			<InputField
				name="address1"
				inputValue={input?.address1}
				required
				handleOnChange={handleOnChange}
				label="Адрес улицы"
				placeholder="Номер дома и название улицы"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
			<InputField
				name="address2"
				inputValue={input?.address2}
				handleOnChange={handleOnChange}
				label="Вторая строка адреса"
				placeholder="Этаж квартиры, этаж здания и т. д. (необязательно)"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
			<InputField
				name="city"
				required
				inputValue={input?.city}
				handleOnChange={handleOnChange}
				label="Город"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
			{/* State */}
			<StateSelection
				input={input}
				handleOnChange={handleOnChange}
				states={states}
				isShipping={isShipping}
				isFetchingStates={isFetchingStates}
			/>
            <InputField
                name="postcode"
                inputValue={input?.postcode}
                required
                handleOnChange={handleOnChange}
                label="Почтовый индекс"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="input-wrapper"
            />
            <InputField
                name="phone"
                inputValue={input?.phone}
                required
                handleOnChange={handleOnChange}
                label="Телефон"
                errors={errors}
                isShipping={isShipping}
                containerClassNames="input-wrapper"
            />
			<InputField
				name="email"
				type="email"
				inputValue={input?.email}
				required
				handleOnChange={handleOnChange}
				label="Email"
				errors={errors}
				isShipping={isShipping}
				containerClassNames="input-wrapper"
			/>
        </div>
		</>
	);
};

Address.propTypes = {
	input: PropTypes.object,
	countries: PropTypes.array,
	handleOnChange: PropTypes.func,
	isFetchingStates: PropTypes.bool,
	isShipping: PropTypes.bool
}

Address.defaultProps = {
	input: {},
	countries: [],
	handleOnChange: () => null,
	isFetchingStates: false,
	isShipping: false
}

export default Address;