import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const Playground = ({ socket }) => {
	const [code, setCode] = useState('');
	const location = useLocation();
	const room_id = location.pathname.split('/')[2];
	useEffect(() => {
		socket.emit('entered', {
			id: room_id,
			name: '',
		});
	}, [location]);
	useEffect(() => {
		socket.on('message', (msg) => {
			console.log(msg);
			setCode(msg.code);
		});
	}, [socket]);
	return (
		<div className=' bg-slate-200 p-4 h-full '>
			<div className='container max-w-[1440px] mx-auto h-full flex flex-col'>
				<header className='mb-8'>
					<h1 className='text-3xl font-bold text-center mb-4'>Playground</h1>
					<div className='flex justify-between items-center  '>
						<div className='flex justify-between max-w-xl w-full bg-slate-400 p-4 text-2xl font-bold rounded-lg shadow-lg shadow-slate-900'>
							<p>User Name</p>
							<p className='text-green-700'>online</p>
						</div>
						<div className='flex justify-between max-w-xl w-full bg-slate-400 p-4 text-2xl font-bold rounded-lg shadow-lg shadow-slate-900'>
							<p>Interviewer Name</p>
							<p className='text-blue-700'>offline</p>
						</div>
					</div>
				</header>
				<main className='w-full h-full '>
					<div className=' flex justify-between max-w-full h-full w-full bg-slate-400 p-4 text-lg font-bold rounded-lg shadow-lg shadow-slate-900 flex-col'>
						<div className='code__header mb-3'>
							<h1 className='text-2xl font-bold'> Code Ground</h1>
						</div>
						<div className='code_wrap h-full  '>
							<textarea
								value={code}
								onChange={(e) => {
									setCode(e.target.value);
									socket.emit('message', {
										code: e.target.value,
									});
								}}
								className='w-full h-full bg-slate-900  text-white border-none outline-none p-4'></textarea>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Playground;
