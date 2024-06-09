import { FC, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import { Duration } from 'luxon';
import cn from 'clsx';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { AppConstants } from '@/app.constants';
import { TimerStatus } from './timer.interface';

const options = {
	sessionCount: 5,
	flowTime: 59,
}

const Timer: FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [status, setStatus] = useState<TimerStatus>(TimerStatus.PAUSE);
	const [currentSession, setCurrentSession] = useState<number>(1);

	const isAllSessionsCompleted = currentSession === options.sessionCount;

	const playerControllers = {
		play: () => {
			status === TimerStatus.COMPLETED && playerControllers.reset();
			setIsPlaying(true);
			setStatus(TimerStatus.PROGRESS);
		},
		pause: () => {
			setIsPlaying(false);
			setStatus(TimerStatus.PAUSE);
		},
		toggle: () => {
			isPlaying
				? playerControllers.pause()
				: playerControllers.play();
		},
		complete: () => {
			setIsPlaying(false);
			setStatus(TimerStatus.COMPLETED);
		},
		reset: () => {
			setCurrentSession(1);
			setStatus(TimerStatus.PAUSE);
		}
	}

	const resolveStatusText = (status: TimerStatus) => {
		switch (status) {
			case TimerStatus.PROGRESS:
				return 'Hard Work';
			case TimerStatus.PAUSE:
				return 'Rest';
			case TimerStatus.COMPLETED:
				return 'Completed';
			default:
				throw Error('Invalid status');
		}
	}

	return (
		<View className='justify-center flex-1'>
			<View className='self-center'>
				<CountdownCircleTimer
					key={currentSession}
					isPlaying={isPlaying}
					duration={options.flowTime}
					colors={['#3A3570', '#664FF3']}
					colorsTime={[options.flowTime, 0]}
					trailColor='#2F2F4C'
					size={270}
					strokeWidth={15}
					onComplete={(totalElapsedTime) => {
						setCurrentSession((prev) => prev + 1);

						isAllSessionsCompleted
							? playerControllers.complete()
							: playerControllers.pause();
					}}
				>
					{(data) => {
						const remainingTime = Duration.fromObject({
							seconds: data.remainingTime || 0
						}).toFormat('mm:ss');

						return (
							<View className='mt-5'>
								<Text className='text-white text-6xl font-semibold'>
									{remainingTime}
								</Text>
								<Text className='text-center text-white text-2xl mt-0.5'>
									{resolveStatusText(status)}
								</Text>
							</View>
						);
					}}
				</CountdownCircleTimer>
			</View>

			<View className='mt-14 flex-row items-center justify-center'>
					{[...new Array(options.sessionCount).keys()].map((num) => (
						<View key={`point-${num}`} className='flex-row items-center'>
							<View className={cn(
								'rounded-full border-[3px]',
								num + 1 === currentSession
									? 'w-[22px] h-[22px] border-[#483AA9] bg-transparent'
									: 'w-5 h-5 border-transparent bg-[#2C2B3C]',
								{
									'bg-primary opacity-70': num + 1 < currentSession,
								},
							)}
							/>
							{num + 1 < options.sessionCount && (
								<View className={cn('w-7 h-0.5 bg-[#2C283C]', {
									'bg-primary opacity-70': num + 2 <= currentSession,
								})} />
							)}
						</View>
					))}

				</View>

			<Pressable
				className={cn(
					'mt-10 self-center bg-primary w-[65px] h-[65px] rounded-full items-center justify-center',
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
		</View>
	);
};

export default Timer;
