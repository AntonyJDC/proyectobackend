import { Router } from 'express';
import { updateUser, desactivateUser } from '../controllers/user.controller';
import authMiddleware from '../middlewares/authMiddleware';
import {updateUserpermissionMiddleware, deleteUserpermissionMiddleware} from '../middlewares/permissionMiddleware';

const router = Router();

router.put('/update/:userId?', authMiddleware, updateUserpermissionMiddleware, updateUser);
router.delete('/desactivate/:userId?', authMiddleware, deleteUserpermissionMiddleware, desactivateUser);

export default router;
