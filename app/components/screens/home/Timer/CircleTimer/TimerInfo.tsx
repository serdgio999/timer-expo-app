import { FC, RefObject } from 'react';
import { Pressable, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Duration } from 'luxon';
import ConfettiCannon from 'react-native-confetti-cannon';
import { TimeProps } from 'react-native-countdown-circle-timer';

import { ITimerControllers, TimerStatus } from '../timer.interface';

interface Props {
	timerData: TimeProps;
	status: TimerStatus;
	reset: ITimerControllers['reset'];
	confettiRef: RefObject<ConfettiCannon>;
}

const TimerInfo: FC<Props> = ({ timerData, status, reset, confettiRef }) => {
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
	};

	const formattedTime = Duration.fromObject({
		seconds: timerData.remainingTime || 0
	}).toFormat('mm:ss');

	return (
		<View className='mt-14'>
			<ConfettiCannon
				ref={confettiRef}
				autoStart={false}
				count={200}
				origin={{ x: -10, y: 0 }}
			/>
			<Text className='text-white text-6xl font-semibold'>{formattedTime}</Text>
			<Text className='text-center text-white text-2xl mt-0.5'>
				{resolveStatusText(status)}
			</Text>
			<Pressable onPress={reset} className='opacity-40 self-center mt-5'>
				<Entypo name='ccw' color='white' size={34} />
			</Pressable>
		</View>
	);
};

export default TimerInfo;
