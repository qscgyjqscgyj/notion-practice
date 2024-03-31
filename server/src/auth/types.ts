import { User } from '@prisma/client';
import { Request } from 'express';

export type SessionUser = Omit<User, 'password'>;

export type AuthRequest = Request & { user: SessionUser };
