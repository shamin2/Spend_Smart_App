import express from 'express';
import { getSpendingInsights } from '../controllers/insightController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getSpendingInsights);

export default router;