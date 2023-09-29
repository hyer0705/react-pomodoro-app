import { atom } from "recoil";

export interface ITimerState {
  minutes: number;
  seconds: number;
}

export const timerState = atom<ITimerState>({
  key: "timer",
  default: {
    minutes: 25,
    seconds: 0,
  },
});

export const roundState = atom({
  key: "round",
  default: 0,
});

export const goalState = atom({
  key: "goal",
  default: 0,
});
