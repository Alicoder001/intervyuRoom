import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: String,
	password: String,
	currentRoomId: String,
});
const userModel = mongoose.model('user', userSchema);
export default userModel;
