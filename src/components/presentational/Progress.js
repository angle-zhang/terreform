import React from 'react';
import styled from 'styled-components';

import { NoSelect } from './Global';

const ProgressWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 2vw;
  width: 100px;
  height: 40vh;
  font-family: 'Quicksand';
  text-align: center;
  transform: translateY(-50%);

  p {
    ${NoSelect}

    margin: 0;
    color: #fff;
    font-size: 15px;
  }

  .bottom-text {
    position: relative;
    top: 37vh;
    width: 100px;
  }
`;

const FillBar = styled.div`
  margin: 10px 40px;
  position: absolute;
  width: 20px;
  height: 35vh;
  border-radius: 20px;
  background-color: #353535;

  #waveShape {
    bottom: 0;
    animation: wave 0.7s infinite linear;
  }

  #waveContainer {
    position: absolute;
    width: 100%;
    height: ${(props) => `calc(${props.fill} * (35vh + 300px))`};
    z-index: 1;
    bottom: -1px;
    margin-left: -50%;
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

  p {
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

const ProgressBar = ({ percent, goal, donations }) => {
  const limitPercent = percent > 0.15 ? percent.toFixed(2) : 0.15;

  return (
    <ProgressWrapper>
      <p>
        <b>{'$' + goal}</b>
      </p>
      <p>goal</p>
      <FillBar fill={limitPercent}>
        <svg width="20px" viewBox="0 0 25 25" id="waveContainer">
          <path
            fill="#fff"
            id="waveShape"
            d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V500H500z"
          />
        </svg>
        <p>{'$' + parseInt(percent * goal)}</p>
      </FillBar>
      <p className="bottom-text">
        <b>{donations}</b> donations
      </p>
    </ProgressWrapper>
  );
};

export default ProgressBar;
