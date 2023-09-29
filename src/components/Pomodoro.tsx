import styled from "styled-components";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

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
  return (
    <Container>
      <Header>
        <Title>Pomodoro</Title>
      </Header>
      <TimerWrapper>
        <TimerItem>
          <Time>25</Time>
        </TimerItem>
        <TimerItem>
          <Time>:</Time>
        </TimerItem>
        <TimerItem>
          <Time>00</Time>
        </TimerItem>
      </TimerWrapper>
      <TimerWrapper>
        <ControlItem>
          <PlayIcon className="h-6 w-6 text-gray-500" />
        </ControlItem>
      </TimerWrapper>
      <InfoWrapper>
        <InfoItem>
          <span>0/4</span>
          <span>ROUND</span>
        </InfoItem>
        <InfoItem>
          <span>0/12</span>
          <span>GOAL</span>
        </InfoItem>
      </InfoWrapper>
    </Container>
  );
}

export default Pomodoro;
