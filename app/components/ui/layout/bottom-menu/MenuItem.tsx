import { FC } from 'react';
import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { AppConstants } from '@/app.constants';

import type { IMenu, TypeNav } from './types';

type Props = {
  item: IMenu;
  navigate: TypeNav;
  currentRoute: string | null;
}

const MenuItem: FC<Props> = ({ item, navigate, currentRoute }) => {
  const isActive = currentRoute === item.path;

  return(
    <Pressable
      className="w-[24%] items-center"
      onPress={() => navigate(item.path)}
    >
      <AntDesign
        name={item.iconName}
        size={26}
        color={isActive ? AppConstants.colors.primary : '#8D8A97'}
      />
    </Pressable>
  )
}

export default MenuItem;
