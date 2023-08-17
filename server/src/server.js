import mongoose from 'mongoose';
import { app } from './app.js';

async function runServer() {
	try {
		await mongoose.connect('mongodb+srv://alicoder:mgolibjon2001@cluster0.lpvjgap.mongodb.net/interview?retryWrites=true&w=majority');
		app.listen(3001, () => {
			console.log('server started!');
		});
	} catch (error) {
		console.log(error);
	}
}
runServer()