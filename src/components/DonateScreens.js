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
  width: 100%;

  &:hover {
    cursor: pointer;
    outline: none;
  }
`;

export const Success = ({ donation, type, onContinue }) => {
  const getModelPng = () => {
    switch (type) {
      case 'tree-1':
      case 'tree-2':
      case 'tree-3':
        return 'pine.png';
      case 'tree-4':
        return 'tree.png';
      case 'crops':
        return 'plant.png';
      case 'coral-1':
      case 'coral-2':
        return 'coral.png';
      default:
        return 'pine.png';
    }
  };

  const getModelName = () => {
    switch (type) {
      case 'tree-1':
      case 'tree-2':
      case 'tree-3':
      case 'tree-4':
        return 'tree';
      case 'crops':
        return 'crop';
      case 'coral-1':
      case 'coral-2':
        return 'coral';
      default:
        return 'object';
    }
  };

  const getContributionText = () => {
    switch (type) {
      case 'tree-1':
      case 'tree-2':
      case 'tree-3':
      case 'tree-4':
        return 'Your contribution will help reforest local farming communities in Brazil.';
      case 'crops':
        return 'crop';
      case 'coral-1':
      case 'coral-2':
        return 'coral';
      default:
        return 'Your contribution will help plant more ';
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
        Your contribution will help plant more trees, <br />
        improve air quality, and protect our oceans. With every donation,
        another {getModelName()} is planted.
      </p>
    </SuccessWrapper>
  );
};
