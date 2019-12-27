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

const facts = [
  'Welcome to Terreform.',
  'More carbon dioxide is in the atmosphere than in the last 800,000 years.',
  '2014 was the world’s hottest year on record.',
  'The Arctic region may have its first completely ice-free summer by 2040.',
  'Global sea level will rise 7 – 23 inches in 80 years.',
  'But you can make a difference...'
];

const Intro = ({ loading, history }) => {
  const [count, setCount] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const transition = () => {
      setOpacity(0);
      setTimeout(() => {
        setCount((count) => (count === facts.length - 1 ? count : count + 1));
        setOpacity(1);
      }, 1000);
    };

    /* change facts every 3 seconds except first and last intro text */
    const interval = setTimeout(() => {
      transition();
      setInterval(transition, 3000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && count === facts.length - 1) {
      setTimeout(() => history.push('/home'), 3000);
    }
  }, [loading, count]);

  return (
    <Centered>
      <p style={{ opacity: count === facts.length - 1 ? 1 : opacity }}>
        {facts[count]}
      </p>
      {!loading ? <ContinueLink to="/home">Continue</ContinueLink> : ''}
    </Centered>
  );
};

export default withRouter(Intro);
