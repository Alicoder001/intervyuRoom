import express from 'express';
import { getUser, login, signUp } from '../controller/user.controller.js';
import { auth } from '../middleware/auth.js';

export const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/signup', signUp);
userRouter.get('/user_id/:user_id', auth, getUser);
userRouter.get('/auth', getUser);
