import React, { FC } from 'react';
import { Pressable } from 'react-native';
import cn from 'clsx';
import Foundation from '@expo/vector-icons/Foundation';

import { ITimerControllers } from '../timer.interface';
import { AppConstants } from '@/app.constants';

interface Props {
	isPlaying: boolean;
	toggle: ITimerControllers['toggle'];
}

const PlayButton: FC<Props> = ({ isPlaying, toggle }) => {
	return (
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
			onPress={toggle}
		>
			<Foundation name={isPlaying ? 'pause' : 'play'} color='white' size={42} />
		</Pressable>
	);
};

export default PlayButton;
