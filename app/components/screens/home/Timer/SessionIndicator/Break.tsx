import React, { FC } from 'react';
import { View } from 'react-native';
import cn from 'clsx';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SessionPointCommonProps } from './session-indicator.interface';

const Break: FC<SessionPointCommonProps> = ({
	index,
	currentSession,
	isSmallIndicator,
	sessionCount
}) => {
	if ((index + 1) % 2 !== 0 || index + 1 >= sessionCount) {
		return null;
	}

	return (
		<View
			className={cn(
				'absolute z-30 -top-6',
				isSmallIndicator ? 'left-[20px]' : 'left-[26px]'
			)}
		>
			<AntDesign
				name='rest'
				size={isSmallIndicator ? 16 : 19}
				color={index + 1 < currentSession ? '#523FC0' : '#2C2B3C'}
			/>
		</View>
	);
};

export default Break;
