import styled from "styled-components";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import {
  ITimerState,
  goalState,
  roundState,
  timerState,
} from "../recoil/timerAtom";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  margin: 40px 0 80px 0;
`;
const Title = styled.h1`
  font-size: 54px;
  font-weight: 700;
  text-align: center;
`;

const TimerWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;
const TimerItem = styled.div`
  padding: 100px 50px;
  background-color: ${(props) => props.theme.timeCardColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;

  &:nth-child(2) {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.hazyTextColor};
    padding: 100px 20px;
  }
`;
const Time = styled.span`
  font-size: 90px;
`;

const ControlItem = styled.div`
  width: 75px;
  height: 75px;
  padding: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.buttonWrapColor};
  cursor: pointer;
`;

const InfoWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold;
  }
  span:first-child {
    font-size: 36px;
    color: ${(props) => props.theme.hazyTextColor};
    margin-bottom: 28px;
  }

  span:last-child {
    font-size: 28px;
    color: ${(props) => props.theme.textColor};
  }
`;

function Pomodoro() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timerId: number;

    if (isActive) {
      timerId = setInterval(() => {
        setTimer((prev: ITimerState) => {
          const { minutes, seconds } = prev;

          if (minutes === 0) {
            if (seconds - 1 === 0) {
              return {
                minutes: 25,
                seconds: 0,
              };
            }
          }
          if (seconds === 0) {
            return {
              minutes: minutes - 1,
              seconds: 59,
            };
          }
          return {
            minutes,
            seconds: seconds - 1,
          };
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isActive]);

  useEffect(() => {
    if (isActive && timer.minutes % 25 === 0 && timer.seconds === 0) {
      setRound((prevRound) => prevRound + 1);
      return;
    }
  }, [timer]);

  useEffect(() => {
    if (round === 4) {
      setRound(0);
      setGoal((prevGoal) => prevGoal + 1);
    }
  }, [round]);

  useEffect(() => {
    if (goal === 12) {
      setGoal(0);
      setIsActive(false);
    }
  }, [goal]);

  return (
    <Container>
      <Header>
        <Title>Pomodoro</Title>
      </Header>
      <TimerWrapper>
        <TimerItem>
          <Time>{timer.minutes.toString().padStart(2, "0")}</Time>
        </TimerItem>
        <TimerItem>
          <Time>:</Time>
        </TimerItem>
        <TimerItem>
          <Time>{timer.seconds.toString().padStart(2, "0")}</Time>
        </TimerItem>
      </TimerWrapper>
      <TimerWrapper>
        {isActive ? (
          <ControlItem onClick={() => setIsActive(false)}>
            <PauseIcon className="h-6 w-6 text-gray-500" />
          </ControlItem>
        ) : null}
        {!isActive ? (
          <ControlItem onClick={() => setIsActive(true)}>
            <PlayIcon className="h-6 w-6 text-gray-500" />
          </ControlItem>
        ) : null}
      </TimerWrapper>
      <InfoWrapper>
        <InfoItem>
          <span>{`${round}/4`}</span>
          <span>ROUND</span>
        </InfoItem>
        <InfoItem>
          <span>{`${goal}/12`}</span>
          <span>GOAL</span>
        </InfoItem>
      </InfoWrapper>
    </Container>
  );
}

export default Pomodoro;
