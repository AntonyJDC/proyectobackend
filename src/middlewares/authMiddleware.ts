import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Clave secreta para firmar y verificar tokens
const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Middleware de autenticación
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verificamos el token
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // Agregamos la información del usuario decodificado al objeto req
        req.body.user = decoded;

        next();  // Continuamos con la siguiente función en la cadena de middleware
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
