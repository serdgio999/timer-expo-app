import React, { FC } from 'react';
import { Pressable } from 'react-native';
import cn from 'clsx';
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import { AppConstants } from '@/app.constants';

import { IPlayerControllers } from './timer.interface';

interface Props {
  isPlaying: boolean;
  playerControllers: IPlayerControllers;
}

const ActionButtons: FC<Props> = ({ isPlaying, playerControllers }) => {
  return (
    <>
      <Pressable onPress={playerControllers.prevSession} className='opacity-40'>
        <Entypo
          name='chevron-left'
          color='white'
          size={34}
        />
      </Pressable>
      <Pressable
        className={cn(
          'mx-5 bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
          {
            'pl-1.5': !isPlaying
          }
        )}
        style={{
          shadowColor: AppConstants.colors.primary,
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 20
        }}
        onPress={playerControllers.toggle}
      >
        <Foundation
          name={isPlaying ? 'pause' : 'play'}
          color='white'
          size={42}
        />
      </Pressable>
      <Pressable onPress={playerControllers.nextSession} className='opacity-40'>
        <Entypo
          name='chevron-right'
          color='white'
          size={34}
        />
      </Pressable>
    </>
  )
}

export default ActionButtons;
