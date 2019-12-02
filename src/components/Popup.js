import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  width: 74%;
  margin-left: 13%;
  display: flex;
  justify-content: ${(props) => (props['flex-end'] ? 'flex-end' : 'center')};
  align-items: center;
`;

const StyledPopup = styled.div`
  position: absolute;
  left: ${(props) => props.x + 'px'}
  top: ${(props) => props.y + 'px'}
  z-index: 2;
  transform: translateX(-50%);

  & h3,p {
    text-align: center;
    margin: 5px;
  }
`;

const DonationPopup = ({ donation, x, y, hide }) => {
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
  width: 380px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 5;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

export const SuccessPopup = ({ donation }) => {
  return (
    <Success>
      <Row>
        <b>Test Me</b> 12/1/2019
      </Row>
      <br />
      <Row>
        <Icon src="check.svg" />
      </Row>
      <br />
      <Row>
        Your virtual tree has been successfully planted. Share this post or go
        home.
      </Row>
      <Row>
        <Icon src="home.svg" />
        <Icon src="share.svg" />
      </Row>
    </Success>
  );
};

export default DonationPopup;
