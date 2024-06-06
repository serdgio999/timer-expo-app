import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';

import type { IUser } from '../types/user.interface';

export type User = IUser | null;

interface IAuthContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<IAuthContext>(null);

const AuthProvider: FC<PropsWithChildren<unknown>> =
