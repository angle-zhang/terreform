import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Home from './Home';
import { StyledLink } from './presentational/Button';

const Centered = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & p {
    font-size: 42px;
    font-weight: bold;
    margin-top: 40vh;
    transition: opacity 0.5s;
    color: #636363;
  }
`;

const ContinueLink = styled(StyledLink)`
  margin-top: 40vh;
  margin-left: 80%;
  color: #a9adb6;
`;

const introText = [
  'Welcome to Terreform.',
  'By 2020, sea levels will rise between 1 to 4 feet worldwide.',
  'No more freshwater is available in Australia.',
  'Bananas are going extinct.',
  'There are currently fires in Westwood.',
  '33 penguins lose their homes every other third second.',
  "The world's largest glacier will disappear in 50 years."
];

const Intro = ({ loading }) => {
  const [count, setCount] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const cycle = () => {
    setOpacity(0);
    setTimeout(() => {
      setCount((count) => (count == introText.length - 1 ? 1 : count + 1));
      setOpacity(1);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(cycle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Centered>
      <p style={{ opacity }}>{introText[count]}</p>
      {!loading ? <ContinueLink to="/home">Skip</ContinueLink> : ''}
    </Centered>
  );
};

export default Intro;
