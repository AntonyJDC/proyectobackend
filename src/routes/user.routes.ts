import { Router } from 'express';
import { updateUser, deactivateUser } from '../controllers/user.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.put('/update', authMiddleware, updateUser);
router.delete('/deactivate', authMiddleware, deactivateUser);

export default router;
