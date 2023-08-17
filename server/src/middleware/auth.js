import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
export const auth = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({
				error: 'Token topilmadi!',
			});
		}
		const validToken = jwt.verify(token, 'secret');
		if (!validToken) {
			return res.status(401).json({
				error: 'Token xato',
			});
		}
		const user_id = validToken.user_id;
		const user = await userModel.findOne({ _id: user_id });
		if (!user) {
			return res.status(404).json({
				error: 'Foydalanuvchi topilmadi!',
			});
		}
	} catch (error) {
		res.status(500).json({
			error: 'Serverda xatolik yurz berdi!',
		});
	}
};
