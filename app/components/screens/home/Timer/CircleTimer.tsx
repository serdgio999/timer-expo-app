import { FC, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Duration } from 'luxon';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { IPlayerControllers, ITimerState, TimerStatus } from './timer.interface';

interface Props {
  timerState: ITimerState;
  playerControllers: IPlayerControllers;
}

const CircleTimer: FC<Props> = ({ timerState, playerControllers }) => {
  const confettiRef = useRef<ConfettiCannon>(null);
  const { key, isPlaying, currentSession, status, options } = timerState;
  const isAllSessionsCompleted = currentSession === options.sessionCount;

  const resolveStatusText = (status: TimerStatus) => {
    switch (status) {
      case TimerStatus.PROGRESS:
        return 'Hard Work';
      case TimerStatus.REST:
        return 'Rest';
      case TimerStatus.PAUSE:
        return 'Pause';
      case TimerStatus.COMPLETED:
        return 'Completed';
      default:
        throw Error('Invalid status');
    }
  }

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={isPlaying}
      duration={status === TimerStatus.REST ? options.restTime : options.workTime}
      colors={['#3A3570', '#664FF3']}
      colorsTime={[options.workTime, 0]}
      trailColor='#2F2F4C'
      size={270}
      strokeWidth={15}
      onComplete={(totalElapsedTime) => {
        isAllSessionsCompleted
          ? playerControllers.complete(confettiRef)
          : playerControllers.nextSession();
      }}
    >
      {(data) => {
        const remainingTime = Duration.fromObject({
          seconds: data.remainingTime || 0
        }).toFormat('mm:ss');

        return (
          <View className='mt-14'>
            <ConfettiCannon
              ref={confettiRef}
              autoStart={false}
              count={200}
              origin={{ x: -10, y: 0 }}
            />
            <Text className='text-white text-6xl font-semibold'>
              {remainingTime}
            </Text>
            <Text className='text-center text-white text-2xl mt-0.5'>
              {resolveStatusText(status)}
            </Text>
            <Pressable onPress={playerControllers.reset} className='opacity-40 self-center mt-5'>
              <Entypo
                name='ccw'
                color='white'
                size={34}
              />
            </Pressable>
          </View>
        );
      }}
    </CountdownCircleTimer>
  )
}

export default CircleTimer;
