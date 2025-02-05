import express from 'express';
import { authenticateToken, authorizeRole, verifyUser } from '../middleware/auth.js';
import * as readerController from '../controllers/readerController.js';

const router = express.Router();
