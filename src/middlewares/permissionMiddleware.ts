import { Response, NextFunction } from 'express';
import { AuthRequest } from '../custom';

export const updateUserpermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;;
    const userIdFromToken = req.user?.id;
    const hasEditPermission = req.user?.permissions?.includes('edit_users');

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (hasEditPermission || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};


export const deleteUserpermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;;
    const userIdFromToken = req.user?.id;
    const hasEditPermission = req.user?.permissions?.includes('delete_users');

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (hasEditPermission || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};


export const updateBookpermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;;
    const userIdFromToken = req.user?.id;
    const hasEditPermission = req.user?.permissions?.includes('edit_books');

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (hasEditPermission || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const deleteBookpermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;;
    const userIdFromToken = req.user?.id;
    const hasEditPermission = req.user?.permissions?.includes('delete_books');

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (hasEditPermission || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const createBookpermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;;
    const userIdFromToken = req.user?.id;
    const hasEditPermission = req.user?.permissions?.includes('create_books');

    // Permitir si el usuario tiene permiso de editar usuarios o si el usuario está modificando su propio perfil
    if (hasEditPermission || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};


