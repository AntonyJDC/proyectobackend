import { Request, Response } from 'express';
import User from '../models/user.model';

// Crear un nuevo usuario (registro)
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Crear el nuevo usuario
        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error al crear el usuario', error: errorMessage });
    }
};

// Iniciar sesión (login)
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario está activo
        if (!user.isActive) {
            return res.status(403).json({ message: 'El usuario está deshabilitado' });
        }

        // Comparar contraseñas
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Aquí puedes generar un token JWT si lo deseas
        // const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', user }); // Puedes agregar el token si lo implementas
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error al iniciar sesión', error: errorMessage });
    }
};

// Obtener un usuario (perfil)
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error al obtener el usuario', error: errorMessage });
    }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error al actualizar el usuario', error: errorMessage });
    }
};

// Deshabilitar (soft delete) un usuario
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        ).select('-password');

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario deshabilitado correctamente', user: deletedUser });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error al deshabilitar el usuario', error: errorMessage });
    }
};
