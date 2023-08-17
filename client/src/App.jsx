import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Enter from './components/Enter/Enter';
import Playground from './components/Playground/Playground';
import { io } from 'socket.io-client';
import Login from './page/Login';
import SignUp from './page/SignUp';

import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAxios';
const socket = io('http://127.0.0.1:3000');
function App() {
	const [user, setUser] = useState(null);
	const { auth, msg, data, error } = useAuth();
	const token = JSON.parse(localStorage.getItem('token'));
	useEffect(() => {
		auth(token);
	}, []);
	useEffect(() => {
		setUser(data?.data?.user);
	}, [data]);
	return (
		<div className='App h-full'>
			<BrowserRouter>
				<p>{data?.data?.message}</p>
				<Routes>
					<Route path='/' element={<Enter socket={socket} />} />
					<Route path='/login' element={<Login socket={socket} user={user} setUser={setUser} />} />
					<Route path='/signup' element={<SignUp socket={socket} />} />
					<Route path='/room/:roomId' element={<Playground socket={socket} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
