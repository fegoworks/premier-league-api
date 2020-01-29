import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/auth/create-user', UserController.createUser);
router.post('/auth/signin', UserController.signIn);

export default router;
