import React from 'react';

const Enter = () => {
	return (
		<div className='bg-slate-200 p-4 h-full '>
			<div className='container max-w-[1440px] mx-auto h-full flex flex-col justify-center items-center'>
				<form className=' flex max-w-2xl w-full bg-transparent p-4 text-lg font-bold rounded-lg  flex-col gap-7'>
					<input type='text' placeholder='New Room' className='outline-none border-none bg-white p-3 rounded text-black' />
					<button className='rounded bg-green-500 p-4 mb-20 text-white'>Create Room</button>
					<input type='text' placeholder='Room id' className='outline-none border-none bg-white p-3 rounded text-black' />
					<button className='rounded bg-blue-500 p-4 text-white'>Enter Room</button>
				</form>
			</div>
		</div>
	);
};

export default Enter;
