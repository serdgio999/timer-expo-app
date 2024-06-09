import AntDesign from '@expo/vector-icons/AntDesign';
import { TypeRootStackParamsList } from '../../../Navigation/types';

export interface IMenu {
	iconName: keyof typeof AntDesign.glyphMap;
	path: keyof TypeRootStackParamsList;
}

export type TypeNav = (name: keyof TypeRootStackParamsList) => void;
