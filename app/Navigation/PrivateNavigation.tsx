import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TypeRootStackParamsList } from './types';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/Navigation/routes';

import Auth from '@/components/screens/auth/Auth';

const Stack = createNativeStackNavigator<TypeRootStackParamsList>();

const PrivateNavigation: FC = () => {
  const { user } = useAuth();

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1E1C2E'
        }
      }}
    >
      {user
        ? routes.map((route) => <Stack.Screen key={route.name} {...route} />)
        : <Stack.Screen name="Auth" component={Auth} />
      }
    </Stack.Navigator>
  )
}

export default PrivateNavigation;
