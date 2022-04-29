import express from 'express';
import { getPlayer } from '../controllers/players.js';

const router = express.Router();

router.get('/:name', getPlayer);

export default router;
