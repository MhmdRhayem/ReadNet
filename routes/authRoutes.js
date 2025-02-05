import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// HTML Routes (these will be mounted at root '/')
router.get('/login', authController.getLoginPage);
router.get('/signup', authController.getSignupPage);
