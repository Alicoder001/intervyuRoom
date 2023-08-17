import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await userModel.findOne({ userName });
		if (!user) {
			return res.status(404).json({
				error: 'Foydalanuvchi topilmadi',
			});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Parol noto'g'ri" });
		}
		const token = jwt.sign({ user_id: user._id }, 'secret', { expiresIn: '30d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ message: 'Foydaluvchi muvaffaqiyatli tizimga kirdi', token });
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const signUp = async (req, res) => {
	try {
		const { firstName, lastName, userName, password } = req.body;
		const user = await userModel.findOne({ userName });
		if (user) {
			return res.json({ error: 'Bu userName allaqachon mavjud' });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		await userModel.create({ firstName, lastName, userName, password: hashPassword, currentRoomId: null });
		res.status(201).json({ message: "Foydanuvchi muvaffaqiyatli ro'yxatdan o'tdi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'Serverda xatolik yuz berdi!',
		});
	}
};
export const getUser = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const user_id = jwt.verify(token, 'secret').user_id;
		if (!user_id) {
			return res.status(401).json({ error: 'Kirish xatosi' });
		}
		const user = await userModel.findOne({ _id: user_id }, { _id: 0, __v: 0, password: 0 });
		if (!user) {
			return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
		}
		res.status(200).json({ user, message: 'Autentifikatsiya muvaqffaqiyatli amalga oshirildi' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'Serverda xatolik yuz berdi!',
		});
	}
};
