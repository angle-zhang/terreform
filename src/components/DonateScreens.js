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
  height: 325px;
  max-width: 100%;

  &:hover {
    cursor: pointer;
    outline: none;
  }
`;

export const Success = ({ donation, type, onContinue }) => {
  const getModelPng = () => {
    if (type.includes('pine')) {
      return 'pine.png';
    } else if (type.includes('tree')) {
      return 'tree.png';
    } else if (type.includes('coral')) {
      return 'coral.png';
    } else if (type.includes('crops')) {
      return 'plant.png';
    } else {
      return 'pine.png';
    }
  };

  const getModelName = () => {
    if (type.includes('tree')) {
      return 'tree';
    } else if (type.includes('coral')) {
      return 'coral';
    } else if (type.includes('crops')) {
      return 'crop';
    } else {
      return 'object';
    }
  };

  const getContributionText = () => {
    if (type.includes('tree')) {
      return 'Your contribution will help reforest local farming communities in Brazil.';
    } else if (type.includes('coral')) {
      return 'Your contribution will help preserve and protect coral reefs in Mexico.';
    } else if (type.includes('crops')) {
      return 'Your contribution will help small Moroccan farming communities by planting high-quality fruit trees.';
    } else {
      return 'Your contribution will make a difference in protecting our planet.';
    }
  };

  return (
    <SuccessWrapper>
      <h2>Thank You.</h2>
      <h3>You have successfully donated ${donation.amount}!</h3>
      <Img src={`images/${getModelPng()}`} onClick={onContinue} />
      <p>
        <em style={{ color: '#8b8b8b' }}>
          Click the {getModelName()} above <br /> to plant yours.
        </em>
      </p>
      <p style={{ marginTop: '40px', width: '400px' }}>
        {getContributionText()} <br />
        With every donation, another {getModelName()} is planted.
      </p>
    </SuccessWrapper>
  );
};
