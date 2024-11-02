import { NextFunction, Response } from 'express';
import Book from '../models/book.model';
import { AuthRequest } from '../custom';

// Crear un nuevo libro
export const createBook = async (req: AuthRequest, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book', error });
    }
};

// Actualizar un libro
export const updateBook = async (req: AuthRequest, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error });
    }
};

// Eliminar (soft delete) un libro
export const deleteBook = async (req: AuthRequest, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByIdAndUpdate(bookId, { isActive: false }, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error });
    }
};

// Obtener un libro específico
export const getBook = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findOne({ _id: bookId, isActive: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// Obtener todos los libros con filtros
export const getBooks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { genre, publishedDate, publisher, author, title, isAvailable } = req.query;

        // Crear un objeto de filtros dinámicos
        const filters: any = { isActive: true };

        // Agregar filtros opcionales si están presentes en la consulta
        if (genre) filters.genre = genre;
        if (publishedDate) filters.publishedDate = new Date(publishedDate as string);
        if (publisher) filters.publisher = publisher;
        if (author) filters.author = author;
        if (title) filters.title = { $regex: title, $options: 'i' };
        if (isAvailable !== undefined) filters.isAvailable = isAvailable === 'true';

        const books = await Book.find(filters);
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// Reservar un libro
export const reserveBook = async (req: AuthRequest, res: Response) => {
    try {
        const { bookId } = req.params;
        const  userId  = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const book = await Book.findById(bookId);

        if (!book || book.isActive == false) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!book.isAvailable) {
            return res.status(400).json({ message: 'Book is already reserved' });
        }

        // Agregar la reserva y actualizar la disponibilidad
        book.reservedBy.push({
            userId,
            reservedDate: new Date(),
            returnDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 días de plazo
        });
        book.isAvailable = false;
        await book.save();

        res.status(200).json({ message: 'Book reserved successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reserve book', error });
    }
};
