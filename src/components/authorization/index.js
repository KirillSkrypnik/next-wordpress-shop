import { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context';
import { useRouter } from 'next/router';
import { LOGIN_ENDPOINT } from '@/constants/endpoints';


const LoginForm = () => {
	const { setUser } = useContext(AppContext);
	const [formData, setFormData] = useState({ username: '', password: '' });
    const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        setLoading(true);
		try {
			const res = await axios.post(LOGIN_ENDPOINT, formData);

			if (res?.data?.success) {
                setSuccess('Авторизация успешна!');
                setError('');

                // ✅ Сохраняем пользователя в контекст
                setUser({
                    username: res.data.username,
                    email: res.data.email || '', // ← добавь email
                    avatar: res.data.avatar || null,
                    token: res.data.token || null,
                });

                localStorage.setItem('auth_token', res.data.token); // если есть
			} else {
				setError(res?.data?.message || 'Ошибка авторизации.');
			}
		} catch (err) {
			setError(err?.response?.data?.message || 'Ошибка при соединении с сервером.');
		}
        setLoading(false);
	};

	return (
		<form className="form-login" onSubmit={handleSubmit}>
			<input
				type="text"
				name="username"
				placeholder="Имя пользователя"
				value={formData.username}
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
			<button type="submit">{ loading ? 'Загрузка' : 'Войти' }</button>

			{error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
			{success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}
		</form>
	);
};

export default LoginForm;
