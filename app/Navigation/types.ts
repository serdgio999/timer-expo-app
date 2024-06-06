import { ComponentType } from 'react';

export type TypeRootStackParamsList = {
  Auth: undefined;
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  Statistics: undefined;
}

export interface IRoute {
  name: keyof TypeRootStackParamsList,
  component: ComponentType,
}
