import { useContext, useState } from 'react';
import { AppContext } from '../context';
import RegistrationForm from '../registration';
import LoginForm from '../authorization';

const Modal = () => {
	const { isModalOpen, setIsModalOpen, formType, setFormType } = useContext(AppContext);

	if (!isModalOpen) return null;

	return (
		<div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className='closeModal' onClick={() => setIsModalOpen(false)}></button>
				{formType === 'login' ? (
				<>
					<h2>Вход</h2>
					<LoginForm />
					<div className='another-way'>Нет аккаунта? <button onClick={() => setFormType('register')}>Зарегистрироваться</button></div>
				</>
				) : (
				<>
					<RegistrationForm />
					<div className='another-way'>Уже есть аккаунт? <button onClick={() => setFormType('login')}>Войти</button></div>
				</>
				)}
				
			</div>
		</div>
	);
};

export default Modal;
