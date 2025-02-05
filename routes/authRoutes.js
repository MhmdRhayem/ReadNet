import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// HTML Routes (these will be mounted at root '/')
router.get('/login', authController.getLoginPage);
router.get('/signup', authController.getSignupPage);

// API Routes (these will be mounted at '/api')
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

export default router; 