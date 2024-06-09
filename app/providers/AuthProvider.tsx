import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState
} from 'react';
import * as Splash from 'expo-splash-screen';

import type { IUser } from '@/types/user.interface';

export type User = IUser | null;

interface IAuthContext {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

let ignore = Splash.preventAutoHideAsync();

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<User>({} as User);

	useEffect(() => {
		let isMounted = false;

		const getUserFromStorage = async () => {
			if (isMounted) {
			}

			await Splash.hideAsync();
		};

		let ignore = getUserFromStorage();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
