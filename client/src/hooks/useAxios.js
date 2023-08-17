import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useAxios = () => {
	const [msg, setMsg] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	async function login(data) {
		console.log(data);
		setLoading(true);
		try {
			const req = await axios.post('http://localhost:3001/user/login', {
				userName: data.get('userName'),
				password: data.get('password'),
			});
			setMsg(req);
			setTimeout(() => {
				setMsg(null);
			}, 5000);
			setLoading(false);
			setError(null);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}

	return { login, msg, loading, error };
};

export const useAuth = () => {
	const [msg, setMsg] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const auth = async (token) => {
		setLoading(true);
		try {
			const res = await axios.get('http://localhost:3001/user/auth', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setData(res);
			setLoading(false);
			setError(null);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(error);
		}
	};
	return { auth, msg, data, loading, error };
};
