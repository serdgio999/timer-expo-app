import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { ITimerControllers, ITimerState, TimerStatus } from './timer.interface';
import { options } from './timer.options';

import CircleTimer from './CircleTimer';
import SessionIndicator from './SessionIndicator';
import ActionButtons from './ActionButtons';

const Timer: FC = () => {
	const [timer, setTimer] = useState<ITimerState>({
		currentSession: 1,
		key: 1,
		status: TimerStatus.PAUSE,
		isPlaying: false,
		options
	});

	const { currentSession, isPlaying, status } = timer;

	const setTimerState = (data: Partial<ITimerState>) => {
		setTimer((prevState) => ({
			...prevState,
			...data
		}));
	};

	const timerControllers: ITimerControllers = {
		play: () => {
			status === TimerStatus.COMPLETED && timerControllers.reset();
			setTimerState({ isPlaying: true });
			status !== TimerStatus.REST &&
				setTimerState({ status: TimerStatus.PROGRESS });
		},
		pause: () => {
			setTimerState({ isPlaying: false });
			setTimerState({ status: TimerStatus.PAUSE });
		},
		toggle: () => {
			isPlaying ? timerControllers.pause() : timerControllers.play();
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
			timerControllers.pause();
			setTimerState({ key: (timer.key += 1) });
			setTimerState({ currentSession: 1 });
		},
		nextSession: () => {
			if (currentSession === options.sessionCount) {
				return;
			}

			currentSession % 2 === 0
				? timerControllers.rest()
				: timerControllers.pause();

			setTimerState({ currentSession: (timer.currentSession += 1) });
			setTimerState({ key: (timer.key += 1) });
		},
		prevSession: () => {
			if (currentSession <= 1) {
				return;
			}

			timerControllers.pause();
			setTimerState({ currentSession: (timer.currentSession -= 1) });
			setTimerState({ key: (timer.key += 1) });
		}
	};

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CircleTimer timerState={timer} timerControllers={timerControllers} />
			</View>

			{/* Indicators(Sessions) */}
			<View className='mt-14 flex-row items-center justify-center'>
				<SessionIndicator timerState={timer} />
			</View>

			{/* Buttons */}
			<View className='flex-row justify-center items-center mt-14'>
				<ActionButtons
					isPlaying={isPlaying}
					timerControllers={timerControllers}
				/>
			</View>
		</View>
	);
};

export default Timer;
