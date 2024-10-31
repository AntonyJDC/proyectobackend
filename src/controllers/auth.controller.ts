import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.action';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser({ name, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    const errorMessage = error as Error;
    res.status(400).json({ message: errorMessage.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    const errorMessage = error as Error;
    res.status(400).json({ message: errorMessage.message });
  }
};
