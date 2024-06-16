import React, { FC } from 'react';
import { Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { ITimerControllers } from '../timer.interface';

interface Props {
	direction: 'left' | 'right';
	timerControllers: ITimerControllers;
}

const ArrowButton: FC<Props> = ({ direction, timerControllers }) => {
	return (
		<Pressable
			onPress={
				direction === 'left'
					? timerControllers.prevSession
					: timerControllers.nextSession
			}
			className='opacity-40'
		>
			<Entypo
				name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
				color='white'
				size={34}
			/>
		</Pressable>
	);
};

export default ArrowButton;
