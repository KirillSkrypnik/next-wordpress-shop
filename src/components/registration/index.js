import { useState, useContext } from 'react';
import axios from 'axios';
import { REG_ENDPOINT } from '@/constants/endpoints';
import { AppContext } from '../context';

const RegistrationForm = () => {
	const { setUser } = useContext(AppContext);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(REG_ENDPOINT, formData);

			if (res?.data?.success) {
				setSuccess('Регистрация успешна!');

				// Сохраняем в контекст
				setUser({
					username: res.data.username,
					email: res.data.email,
					avatar: res.data.avatar || null,
					token: res.data.token || null,
				});
				localStorage.setItem('auth_token', res.data.token);
				setFormData({ username: '', email: '', password: '' });
			} else {
				setError(res?.data?.message || 'Ошибка регистрации.');
			}
		} catch (err) {
			setError(err?.response?.data?.message || 'Ошибка при соединении с сервером.');
		}

		setLoading(false);
	};

	return (
		<form className='form-registrations' onSubmit={handleSubmit}>
			<h2>Регистрация</h2>
			<input
				type="text"
				name="username"
				placeholder="Имя пользователя"
				value={formData.username}
				onChange={handleChange}
				required
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Пароль"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<button type="submit">
				{loading ? 'Загрузка...' : 'Зарегистрироваться'}
			</button>

			{error && <div className='error-message' style={{ color: 'red' }}>{error}</div>}
			{success && <div className='success-message' style={{ color: 'green' }}>{success}</div>}
		</form>
	);
};

export default RegistrationForm;
