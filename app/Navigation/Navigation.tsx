import { FC, useEffect, useState } from 'react';
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';

import BottomMenu from '@/components/ui/bottom-menu/BottomMenu';
import PrivateNavigation from './PrivateNavigation';
import { Text } from 'react-native';

const Navigation: FC = () => {
	const { user } = useAuth();
	const ref = useNavigationContainerRef();
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		setCurrentRoute(ref.getCurrentRoute()?.name);

		const listener = ref.addListener('state', e => {
			// e.data.state.routeNames[e.data.state.index] // - Get current route name.
			setCurrentRoute(ref.getCurrentRoute()?.name);
		});

		return () => {
			ref.removeListener('state', listener);
		};
	}, []);

	return (
		<>
			<NavigationContainer ref={ref}>
				<PrivateNavigation />
			</NavigationContainer>
			{user && currentRoute && (
				<BottomMenu navigate={ref.navigate} currentRoute={currentRoute} />
			)}
		</>
	);
};

export default Navigation;
