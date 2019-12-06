import React from 'react';
import styled from 'styled-components';

import Loading from './presentational/Loading';

const Row = styled.div`
  width: 74%;
  margin-left: 13%;
  display: flex;
  justify-content: ${(props) => (props['flex-end'] ? 'flex-end' : 'center')};
  align-items: center;
`;

const LoadingText = styled.h3`
  margin-top: 40%;
  margin-bottom: 20%;
  text-align: center;
`;

export const Processing = () => {
  return (
    <>
      <LoadingText>Confirming Purchase</LoadingText>
      <Row>
        <Loading />
      </Row>
    </>
  );
};

const SuccessWrapper = styled.div`
  text-align: center;
  margin: 40px;

  h2 {
    font-size: 36px;
    font-family: SF Pro Bold;
    margin-bottom: -10px;
  }

  h3 {
    font-family: SF Pro Light;
    font-size: 20px;
  }

  p {
    font-size: 20px;
    line-height: 26px;
  }
`;

const Img = styled.img`
  height: 350px;

  &:hover {
    cursor: pointer;
    outline: none;
  }
`;

export const Success = ({ donation, onContinue }) => {
  return (
    <SuccessWrapper>
      <h2>Thank You.</h2>
      <h3>You have successfully donated ${'25'}!</h3>
      <Img src="images/pine.png" onClick={onContinue} />
      <p>
        <em style={{ color: '#8b8b8b' }}>
          Click the tree above <br /> to plant yours.
        </em>
      </p>
      <p style={{ marginTop: '40px', width: '400px' }}>
        Your contribution will help plant more trees, <br />
        build more homes, improve air quality, and protect our oceans. With
        every donation, another tree is planted.
      </p>
    </SuccessWrapper>
  );
};
