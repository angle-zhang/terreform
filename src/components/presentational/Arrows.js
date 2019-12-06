import React, { useState } from 'react';
import styled from 'styled-components';

import { NoSelect } from './Global';

const StyledIndicator = styled.div`
  position: absolute;
  top: 45%;
  margin-left: 2vw;
  font-family: 'Quicksand';

  img {
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

  img:hover {
    background-color: rgba(100, 100, 100, 0.5);
    cursor: pointer;
  }

  img:nth-of-type(1):hover {
    top: -10px;
  }

  img:nth-of-type(2):hover {
    top: 10px;
  }

  p {
    ${NoSelect}
    width: 75px;
    margin: 3px;
    text-align: left;
    color: #f8f7f7;
    animation: shake-in linear 0.25s forwards;
  }

  @keyframes shake-in {
    0% {
      opacity: 0;
      margin-left: 0;
    }
    15% {
      margin-left: -30px;
    }
    50% {
      margin-left: 20px;
    }
    85% {
      margin-left: -10px;
    }
    100% {
      opacity: 1;
      margin-left: 0;
    }
  }
`;

const PageArrows = ({ onUp, onDown, current, max }) => {
  const [animationKey, setKey] = useState(0);

  return (
    <StyledIndicator>
      <img
        src="arrow-up.svg"
        alt="Arrow up"
        onClick={() => {
          setKey((key) => key + 1);
          onUp();
        }}
      />
      <p key={animationKey}>
        {'0' + (current + 1)} - {'0' + max}
      </p>
      <img
        src="arrow-down.svg"
        alt="Arrow down"
        onClick={() => {
          setKey((key) => key + 1);
          onDown();
        }}
      />
    </StyledIndicator>
  );
};

export default PageArrows;
