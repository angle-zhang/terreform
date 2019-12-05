import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
  width: 200px;
  position: absolute;
  left: ${(props) => props.x + 'px'}
  top: ${(props) => props.y + 'px'}
  z-index: 3;
  transform: translateX(-50%);
  pointer-events: none;

   h3,p {
    margin: 5px;
    font-size: 16px;
    text-align: center;
  }
`;

export const DonationPopup = ({ donation, x, y, hide }) => {
  if (hide) {
    return '';
  }

  return (
    <StyledPopup x={x} y={y}>
      <h3>{donation.username}</h3>
      <p>Nov. 19, 2019</p>
    </StyledPopup>
  );
};

const Success = styled.div`
  position: absolute;
  left: ${(props) => props.x + 'px'}
  top: ${(props) => props.y + 'px'}
  width: 380px;
  padding: 30px 30px 20px 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  font-size: 20px;
  z-index: 2;
  transform: translateX(-50%);
`;

const Row = styled.div`
  display: flex;
  justify-content: ${(props) => (props['flex-end'] ? 'flex-end' : 'center')};
  align-items: center;
  width: 90%;
  margin: ${(props) => (props['space-around'] ? '20px 0 20px 5%' : '0 5%')}
  text-align: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const MiniIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const TextInfo = styled.p`
  font-size: 15px;
  color: #7c7c7c;
`;

export const SuccessPopup = ({ donation, x, y, hide }) => {
  if (hide) {
    return '';
  }

  return (
    <Success x={x} y={y}>
      <Row>
        <p>
          <b>{donation.username}</b> {donation.date}
        </p>
      </Row>
      <Row>
        <Icon src="check.svg" />
      </Row>
      <Row space-around>
        Your virtual tree has been successfully planted. Share this post or go
        home.
      </Row>
      <Row>
        <Row>
          <MiniIcon src="home.svg" />
          <TextInfo>Go Home</TextInfo>
        </Row>
        <Row>
          <MiniIcon src="share.svg" />
          <TextInfo>Share</TextInfo>
        </Row>
      </Row>
    </Success>
  );
};
