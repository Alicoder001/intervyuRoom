import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
	users: [
		{
			id: String,
			name: String,
			userType: String,
		},
	],
	owner_id: String,
	isPrivate: Boolean,
	messages: [
		{
			id: String,
			user_id: String,
			text: String,
		},
	],
});

const roomModel = mongoose.model('room', roomSchema);
export default roomModel;
