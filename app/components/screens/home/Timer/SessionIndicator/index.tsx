import React, { FC } from 'react';
import { View } from 'react-native';

import { ITimerState } from '../timer.interface';

import Circle from './Circle';
import Break from './Break';
import Line from './Line';
import { SessionPointCommonProps } from './session-indicator.interface';

interface Props {
	timerState: ITimerState;
}

const SessionIndicator: FC<Props> = ({ timerState }) => {
	const { currentSession, options } = timerState;
	const isSmallIndicator = options.sessionCount > 5;

	const getCommonProps = (
		index: number
	): Omit<SessionPointCommonProps, 'sessionCount'> => ({
		index,
		currentSession,
		isSmallIndicator
	});

	return [...new Array(options.sessionCount).keys()].map((index) => (
		<View key={`point-${index}`} className='flex-row items-center'>
			<Circle {...getCommonProps(index)} />
			<Break {...getCommonProps(index)} sessionCount={options.sessionCount} />
			<Line {...getCommonProps(index)} sessionCount={options.sessionCount} />
		</View>
	));
};

export default SessionIndicator;
