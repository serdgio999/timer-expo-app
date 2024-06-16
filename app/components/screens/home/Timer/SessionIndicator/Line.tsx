import React, { FC } from 'react';
import { View } from 'react-native';
import cn from 'clsx';

import { SessionPointCommonProps } from './session-indicator.interface';

const Line: FC<SessionPointCommonProps> = ({
	index,
	currentSession,
	isSmallIndicator,
	sessionCount
}) => {
	if (index + 1 >= sessionCount) {
		return null;
	}

	return (
		<View
			className={cn(
				'h-0.5 bg-[#2C283C]',
				{
					'bg-primary opacity-70': index + 2 <= currentSession
				},
				isSmallIndicator ? 'w-5' : 'w-7'
			)}
		/>
	);
};

export default Line;
