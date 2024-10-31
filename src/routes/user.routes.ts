import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware'; // Asumiendo que tienes un middleware de autenticación

const router = Router();

// Crear usuario (registro)
router.post('/register', createUser);

// Obtener usuario (login)
router.post('/login', getUser);

// Actualizar usuario (requiere autenticación)
router.put('/update/:id', authMiddleware, updateUser);

// Deshabilitar usuario (soft delete, requiere autenticación)
router.delete('/delete/:id', authMiddleware, deleteUser);

export default router;
