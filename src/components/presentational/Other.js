import React from 'react';
import styled, { css } from 'styled-components';

export const NoSelect = css`
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 5vw;
  width: 100px;
  height: 40vh;
  text-align: center;
  transform: translateY(-50%);
  font-family: 'Quicksand';

  & p {
    ${NoSelect}
    color: #fff;
    margin: 0;
    font-size: 15px;
  }
`;

const Progress = styled.div`
  margin: 10px 40px;
  position: absolute;
  width: 20px;
  height: 35vh;
  border-radius: 20px;
  background-color: #353535;

  & #waveShape {
    bottom: 0;
    animation: wave 0.7s infinite linear;
  }

  & #waveContainer {
    position: absolute;
    width: 100%;
    margin-left: -50%;
    height: ${(props) => `calc(${props.fill} * (35vh + 300px))`};
    z-index: 1;
    bottom: -1px;
    border-radius: 0 0 20px 20px;
    transition: height 0.3s ease-in-out;
  }

  @keyframes wave {
    0% {
      transform: translate(-150px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  & p {
    ${NoSelect}
    position: absolute;
    width: 50px;
    z-index: 2;
    margin-left: -14.5px;
    margin-top: ${(props) => 35 - props.fill * 31 + 1 + 'vh'};
    transform: rotate(90deg);
    color: #353535;
    font-size: 15px;
  }
`;

export const ProgressBar = ({ percent, goal, donations }) => {
  const limitPercent = percent > 0.15 ? parseFloat(percent.toFixed(2)) : 0.15;

  return (
    <ProgressWrapper>
      <p>
        <b>{'$' + goal}</b>
      </p>
      <p>goal</p>
      <Progress fill={limitPercent}>
        <svg width="20px" viewBox="0 0 25 25" id="waveContainer">
          <path
            fill="#fff"
            id="waveShape"
            d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V500H500z"
          />
        </svg>
        <p>{'$' + percent * goal}</p>
      </Progress>
      <p
        style={{
          position: 'absolute',
          width: '100px',
          top: '40.5vh'
        }}
      >
        <b>{donations}</b> donations
      </p>
    </ProgressWrapper>
  );
};

const StyledIndicator = styled.div`
  position: absolute;
  top: 45%;
  margin-left: 5vw;
  font-family: 'Quicksand';

  & img {
    ${NoSelect}
    position: relative;
    top: 0px;
    width: 30px;
    height: 30px;
    padding: 8px;
    margin: 0 10px;
    border-radius: 30px;
    transition: all 0.2s ease-in-out;
  }

  & img:hover {
    background-color: rgba(100, 100, 100, 0.5);
    cursor: pointer;
  }

  & img:nth-of-type(1):hover {
    top: -10px;
  }

  & img:nth-of-type(2):hover {
    top: 10px;
  }

  & p {
    ${NoSelect}
    width: 75px;
    margin: 3px;
    text-align: left;
    color: #f8f7f7;
  }
`;

export const ArrowIndicator = ({ onUp, onDown, current, max }) => {
  return (
    <StyledIndicator>
      <img src="arrow-up.svg" alt="Arrow up" onClick={onUp} />
      <p>
        {current + 1 < max ? '0' + (current + 1) : current + 1} - {max}
      </p>
      <img src="arrow-down.svg" alt="Arrow down" onClick={onDown} />
    </StyledIndicator>
  );
};

const StyledSvg = styled.svg`
  position: absolute;
  animation: 2s linear infinite svg-animate;

  & circle {
    fill: transparent;
    stroke: #ccc;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 283;
    // stroke-dashoffset: 75;
    transform-origin: 50% 50%;
    animation: 1.4s ease-in-out infinite both circle-animate;
  }

  @keyframes circle-animate {
    0%,
    15% {
      stroke-dashoffset: 280;
      transform: rotate(0);
    }

    40%,
    65% {
      stroke-dashoffset: 75;
      transform: rotate(45deg);
    }

    100% {
      stroke-dashoffset: 280;
      transform: rotate(360deg);
    }
  }

  @keyframes svg-animate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

export const Loading = () => {
  return (
    <StyledSvg viewBox="0 0 100 100" width="100px">
      <circle cx="50" cy="50" r="45" />
    </StyledSvg>
  );
};
