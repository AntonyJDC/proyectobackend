import { Schema, model, Error } from 'mongoose';
import argon2 from 'argon2';

export interface IUser {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  reservations?: Array<{
    bookId: Schema.Types.ObjectId;
    reservedAt: Date;
    returnedAt?: Date;
  }>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  reservations: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
      reservedAt: { type: Date, default: Date.now },
      returnedAt: { type: Date },
    },
  ],
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    user.password = await argon2.hash(user.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    return false;
  }
};

const User = model<IUser>('User', userSchema);
export default User;
