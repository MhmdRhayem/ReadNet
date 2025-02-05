import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
