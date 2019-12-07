import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { RealLink } from './presentational/Button';

const Centered = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    width: 800px;
    margin-top: 40vh;
    color: #636363;
    font-family: SF Pro Light;
    font-size: 36px;
    transition: opacity 1s;
  }
`;

const ContinueLink = styled(RealLink)`
  position: absolute;
  margin-top: 90vh;
  margin-left: 43vw;
  color: #a9adb6;
`;

const introText = [
  'Welcome to Terreform.',
  'More carbon dioxide is in the atmosphere than in the last 800,000 years.',
  'Global sea level will rise 7 – 23 inches in 80 years.',
  '2014 was the world’s hottest year on record.',
  'The Arctic region may have its first completely ice-free summer by 2040.',
  'But you can make a difference...'
];

const Intro = ({ loading, history }) => {
  const [first, setFirst] = useState(true);
  const [count, setCount] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const cycle = () => {
      setOpacity(0);
      setTimeout(() => {
        setCount((count) =>
          count === introText.length - 1 ? count : count + 1
        );
        setOpacity(1);
      }, 1000);
    };

    const interval = setInterval(cycle, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && count === introText.length - 1) {
      setTimeout(() => history.push('/home'), 3000);
    }
  }, [loading, count]);

  return (
    <Centered>
      <p style={{ opacity: count === introText.length - 1 ? 1 : opacity }}>
        {introText[count]}
      </p>
      {!loading ? <ContinueLink to="/home">Continue</ContinueLink> : ''}
    </Centered>
  );
};

export default withRouter(Intro);
