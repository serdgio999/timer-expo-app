import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { IPlayerControllers, ITimerOptions, ITimerState, TimerStatus } from './timer.interface';

import CircleTimer from './CircleTimer';
import CircleIndicators from './CircleIndicators';
import ActionButtons from './ActionButtons';

const options: ITimerOptions = {
  sessionCount: 6,
  workTime: 59,
  restTime: 20,
}

const Timer: FC = () => {
  const [timer, setTimer] = useState<ITimerState>({
    currentSession: 1,
    key: 1,
    status: TimerStatus.PAUSE,
    isPlaying: false,
    options,
  });

  const { currentSession, isPlaying, status, } = timer;

  const setTimerState = (data: Partial<ITimerState>) => {
    setTimer((prevState) => ({
      ...prevState,
     ...data,
    }))
  }

  const playerControllers: IPlayerControllers = {
    play: () => {
      status === TimerStatus.COMPLETED && playerControllers.reset();
      setTimerState({ isPlaying: true });
      status !== TimerStatus.REST && setTimerState({ status: TimerStatus.PROGRESS });
    },
    pause: () => {
      setTimerState({ isPlaying: false });
      setTimerState({ status: TimerStatus.PAUSE });
    },
    toggle: () => {
      isPlaying
        ? playerControllers.pause()
        : playerControllers.play();
    },
    complete: (confettiRef) => {
      setTimerState({ isPlaying: false });
      setTimerState({ status: TimerStatus.COMPLETED });
      confettiRef.current?.start();
    },
    rest: () => {
      setTimerState({ isPlaying: false });
      setTimerState({ status: TimerStatus.REST });
    },
    reset: () => {
      playerControllers.pause();
      setTimerState({ key: timer.key += 1 });
      setTimerState({ currentSession: 1 });
    },
    nextSession: () => {
      if (currentSession === options.sessionCount) {
        return;
      }

      currentSession % 2 === 0
        ? playerControllers.rest()
        : playerControllers.pause();

      setTimerState({ currentSession: timer.currentSession += 1 });
      setTimerState({ key: timer.key += 1 });
    },
    prevSession: () => {
      if (currentSession <= 1) {
        return;
      }

      playerControllers.pause();
      setTimerState({ currentSession: timer.currentSession -= 1 });
      setTimerState({ key: timer.key += 1 });
    }
  }

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CircleTimer timerState={timer} playerControllers={playerControllers} />
      </View>

      {/* Indicators(Sessions) */}
      <View className='mt-14 flex-row items-center justify-center'>
        <CircleIndicators timerState={timer} />
      </View>

      {/* Buttons */}
      <View className='flex-row justify-center items-center mt-14'>
        <ActionButtons isPlaying={isPlaying} playerControllers={playerControllers} />
      </View>
    </View>
  );
};

export default Timer;
