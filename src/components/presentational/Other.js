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
  height: 30vh;
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
    z-index: 1;
    bottom: -1px;
    // animation: wipe 0.5s forwards;
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

  @keyframes wipe {
    0% {
      height: 0;
    }
    100% {
      height: ${(props) => `calc(${props.fill} * (30vh + 300px))`};
    }
  }

  & p {
    ${NoSelect}
    position: absolute;
    width: 50px;
    z-index: 2;
    margin-left: -14.5px;
    margin-top: ${(props) => 30 - props.fill * 30 + 2 + 'vh'};
    transform: rotate(90deg);
    color: #353535;
    font-size: 15px;
  }
`;

export const ProgressBar = ({ percent, goal, donations }) => {
  const limitPercent = percent > 0.2 ? percent : 0.2;
  const limitPercent = percent > 0.1 ? parseFloat(percent.toFixed(2)) : 0.1;

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
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
          />
        </svg>
        <p>{'$' + percent * goal}</p>
      </Progress>
      <p
        style={{
          position: 'absolute',
          width: '100px',
          top: '365px'
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
