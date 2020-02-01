import express from 'express';
import UserController from '../controllers/user.controller.js';
import validate from '../middlewares/helpers/validate'

const router = express.Router();

router.post('/auth/create-user',
  validate.validateBody(validate.schemas.authSchema),
  UserController.createUser);

router.post('/auth/signin',
  validate.validateBody(validate.schemas.authLoginSchema),
  UserController.signIn);

export default router;