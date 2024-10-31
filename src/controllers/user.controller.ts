import { Request, Response } from 'express';
import { getUserById, updateUserById, deactivateUserById } from '../services/user.action';
import { AuthRequest } from '../custom';

export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.r;
        if (!userId) {
            throw new Error('User ID is missing');
        }
        const updates = req.body;
        const updatedUser = await updateUserById(userId, updates);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deactivateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error('User ID is missing');
        }
        await deactivateUserById(userId);
        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
