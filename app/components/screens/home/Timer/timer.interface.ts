import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

export enum TimerStatus {
  PAUSE = 'pause',
  REST = 'rest',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

export interface ITimerOptions {
  sessionCount: number;
  workTime: number;
  restTime: number;
}

export interface ITimerState {
  isPlaying: boolean;
  status: TimerStatus;
  currentSession: number;
  key: number;
  options: ITimerOptions;
}

export interface ITimerControllers {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  complete: (confettiRef: React.RefObject<ConfettiCannon>) => void;
  rest: () => void;
  reset: () => void;
  nextSession: () => void;
  prevSession: () => void;
}
