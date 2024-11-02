import { Router } from 'express';
import {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getBooks,
    reserveBook
} from '../controllers/book.controller';
import {
    createBookPermissionMiddleware,
    updateBookPermissionMiddleware,
    deleteBookPermissionMiddleware
} from '../middlewares/permissionMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Ruta para crear un libro
router.post('/create', authMiddleware, createBookPermissionMiddleware, createBook);

// Ruta para actualizar un libro
router.put('/update/:bookId', authMiddleware, updateBookPermissionMiddleware, updateBook);

// Ruta para eliminar (soft delete) un libro
router.delete('/delete/:bookId', authMiddleware, deleteBookPermissionMiddleware, deleteBook);

// Ruta para obtener un libro específico
router.get('/:bookId?', async (req, res, next) => {
    const { bookId } = req.params;
    if (bookId) {
        await getBook(req, res, next);
    } else {
        await getBooks(req, res, next);
    }
});

// Ruta para reservar un libro
router.post('/reserve/:bookId', authMiddleware, reserveBook);

export default router;
