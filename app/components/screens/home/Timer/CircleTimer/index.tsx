import { FC, useRef } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import {
	ITimerControllers,
	ITimerState,
	TimerStatus
} from '../timer.interface';

import TimerInfo from './TimerInfo';

interface Props {
	timerState: ITimerState;
	timerControllers: ITimerControllers;
}

const CircleTimer: FC<Props> = ({ timerState, timerControllers }) => {
	const confettiRef = useRef<ConfettiCannon>(null);
	const { key, isPlaying, currentSession, status, options } = timerState;
	const isAllSessionsCompleted = currentSession === options.sessionCount;

	return (
		<CountdownCircleTimer
			key={key}
			isPlaying={isPlaying}
			duration={
				status === TimerStatus.REST ? options.restTime : options.workTime
			}
			colors={['#3A3570', '#664FF3']}
			colorsTime={[options.workTime, 0]}
			trailColor='#2F2F4C'
			size={270}
			strokeWidth={15}
			onComplete={(totalElapsedTime) => {
				isAllSessionsCompleted
					? timerControllers.complete(confettiRef)
					: timerControllers.nextSession();
			}}
		>
			{(data) => (
				<TimerInfo
					timerData={data}
					status={status}
					reset={timerControllers.reset}
					confettiRef={confettiRef}
				/>
			)}
		</CountdownCircleTimer>
	);
};

export default CircleTimer;
