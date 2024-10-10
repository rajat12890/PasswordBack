import express from 'express';
import { registerControllers,loginControllers } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

export default router;