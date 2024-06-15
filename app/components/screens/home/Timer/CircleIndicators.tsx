import React, { FC } from 'react';
import { View } from 'react-native';
import cn from 'clsx';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ITimerState } from './timer.interface';

interface Props {
  timerState: ITimerState;
}

const CircleIndicators: FC<Props> = ({ timerState }) => {
  const { currentSession, options } = timerState;
  const isSmallIndicators = options.sessionCount > 5;

  return (
    [...new Array(options.sessionCount).keys()].map((num) => (
      <View key={`point-${num}`} className='flex-row items-center'>
      <View
        className={cn(
          'rounded-full border-[3px]',
          isSmallIndicators ? 'w-[17px] h-[17px]' : 'w-[22px] h-[22px]',
          num + 1 === currentSession
            ? 'border-[#483AA9] bg-transparent'
            : 'border-transparent bg-[#2C2B3C]',
          {
            'bg-primary opacity-70': num + 1 < currentSession,
          },
        )}
      />
      {((num + 1) % 2 === 0 && num + 1 < options.sessionCount) && (
        <View
          className={cn(
            'absolute z-30 -top-6',
            isSmallIndicators ? 'left-[20px]' : 'left-[26px]',
          )}
        >
          <AntDesign
            name='rest'
            size={isSmallIndicators ? 16 : 19}
            color={num + 1 < currentSession ? '#523FC0' : '#2C2B3C'}
          />
        </View>
      )}
      {num + 1 < options.sessionCount && (
        <View
          className={cn('h-0.5 bg-[#2C283C]', {
            'bg-primary opacity-70': num + 2 <= currentSession,
          }, isSmallIndicators ? 'w-5' : 'w-7')}
        />
      )}
    </View>
    ))
  )
}

export default CircleIndicators;
