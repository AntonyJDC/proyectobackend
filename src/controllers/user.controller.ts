import { Response } from 'express';
import { updateUserById, desactivateUserById } from '../services/user.action';
import { AuthRequest } from '../custom';

export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.params.userId || req.user?.id;
        if (!userId) throw new Error('User ID is missing');
        
        const updates = req.body;
        const updatedUser = await updateUserById(userId, updates);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const desactivateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.params.userId || req.user?.id;
        if (!userId) throw new Error('User ID is missing');
        
        await desactivateUserById(userId);
        res.status(200).json({ message: 'User desactivated successfully' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
