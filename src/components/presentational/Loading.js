import React from 'react';
import styled from 'styled-components';

const SpinSvg = styled.svg`
  position: absolute;
  animation: svg-animate 2s linear infinite;

  circle {
    fill: transparent;
    stroke: #ccc;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 283;
    transform-origin: 50% 50%;
    animation: circle-animate 1.4s ease-in-out infinite both;
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

const Loading = () => {
  return (
    <SpinSvg viewBox="0 0 100 100" width="100px">
      <circle cx="50" cy="50" r="45" />
    </SpinSvg>
  );
};

export default Loading;
