import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST'],
	},
});
let rooms = [];

io.on('connection', (socket) => {
	console.log('connected');
	let room_id = null;
	socket.on('entered', (room) => {
		const has = rooms.find((item) => room.id === item.id)?.id;d
		if (has) {
			room_id = room.id;
		} else {
			rooms.push(room);
			room_id = room.id;
		}
		socket.join(room_id);
		if (room_id) {
			socket.on('message', (msg) => {
				io.to(room_id).emit('message', msg);
			});
		}
	});
});
httpServer.listen(3000, () => {
	console.log('server started');
});
