import React, { FC } from 'react';
import { View } from 'react-native';
import cn from 'clsx';

import { SessionPointCommonProps } from './session-indicator.interface';

const Circle: FC<Omit<SessionPointCommonProps, 'sessionCount'>> = ({
	index,
	currentSession,
	isSmallIndicator
}) => {
	return (
		<View
			className={cn(
				'rounded-full border-[3px]',
				isSmallIndicator ? 'w-[17px] h-[17px]' : 'w-[22px] h-[22px]',
				index + 1 === currentSession
					? 'border-[#483AA9] bg-transparent'
					: 'border-transparent bg-[#2C2B3C]',
				{
					'bg-primary opacity-70': index + 1 < currentSession
				}
			)}
		/>
	);
};

export default Circle;
