import { Router } from 'express';
import { updateUser, desactivateUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateUserPermissionMiddleware, deleteUserPermissionMiddleware } from '../middlewares/permissionMiddleware';

const router = Router();

router.put('/update/:userId?', authMiddleware, updateUserPermissionMiddleware, updateUser);
router.delete('/desactivate/:userId?', authMiddleware, deleteUserPermissionMiddleware, desactivateUser);

export default router;
