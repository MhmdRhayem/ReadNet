import express from 'express';
import { authenticateToken, authorizeRole, verifyUser } from '../middleware/auth.js';
import * as authorController from '../controllers/authorController.js';
import multer from 'multer';
import path from 'path';
import db from '../config/database.js';
