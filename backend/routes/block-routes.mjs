import express from 'express';
import { protect } from '../middleware/authorization.mjs';
import { addBlock } from '../controllers/block-controller.mjs';

const router = express.Router();

router.post('/mine', protect, addBlock);

export default router;
