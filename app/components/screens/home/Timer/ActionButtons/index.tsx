import React, { FC } from 'react';

import { ITimerControllers } from '../timer.interface';

import ArrowButton from './ArrowButton';
import PlayButton from './PlayButton';

interface Props {
	isPlaying: boolean;
	timerControllers: ITimerControllers;
}

const ActionButtons: FC<Props> = ({ isPlaying, timerControllers }) => {
	return (
		<>
			<ArrowButton direction='left' timerControllers={timerControllers} />
			<PlayButton isPlaying={isPlaying} toggle={timerControllers.toggle} />
			<ArrowButton direction='right' timerControllers={timerControllers} />
		</>
	);
};

export default ActionButtons;
