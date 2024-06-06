import { FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TypeNav } from './types';

import MenuItem from './MenuItem';

import { menuData } from './menu.data';

type Props = {
  navigate: TypeNav;
  currentRoute: string | null;
}

const BottomMenu: FC<Props> = (props) => {
  const { bottom } = useSafeAreaInsets();

  return(
    <View
      className="pt-5 px-3 flex-row justify-between items-center w-full bg-[#1E1C2E]"
      style={{
        paddingBottom: bottom + 10,
      }}
    >
      {menuData.map((item) => (
        <MenuItem
          key={item.path}
          item={item}
          {...props}
        />
      ))}
    </View>
  )
}

export default BottomMenu;
