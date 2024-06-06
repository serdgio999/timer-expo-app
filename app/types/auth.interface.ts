import { IUser } from './user.interface';

export interface IAuthFormData extends Omit<IUser, '_id'> {}
