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
  left: 90vw;
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
  background-color: #777;
  height: ${(props) => (!props.background ? props.fill * 30 + 'vh' : '30vh')};
  border-radius: ${(props) => (!props.background ? '20px 20px 0 0' : '20px')};
  background-color: ${(props) => (props.background ? '#fff' : '#444')};

  & p {
    ${NoSelect}
    position: absolute;
    width: 50px;
    margin-left: -14.5px;
    margin-top: ${(props) => props.fill * 30 + 2 + 'vh'};
    transform: rotate(90deg);
    color: #353535;
    font-size: 15px;
  }
`;

export const ProgressBar = ({ percent, goal, donations }) => {
  const limitPercent = percent > 0.2 ? percent : 0.2;
  return (
    <ProgressWrapper>
      <p>
        <b>{'$' + goal}</b>
      </p>
      <p>goal</p>
      <Progress background fill={1 - limitPercent}>
        <p>{'$' + percent * goal}</p>
      </Progress>
      <Progress fill={1 - limitPercent} />
      <p
        style={{
          position: 'absolute',
          width: '100px',
          top: '385px'
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
    transition: all 0.3s;
  }

  & img:hover {
    background-color: #bbb;
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

// () => setPage(page == maxPage - 1 ? 0 : page + 1)
// () => setPage(page == 0 ? maxPage - 1 : page - 1)
