import React from 'react';
import styled from 'styled-components';

import { NoSelect } from './presentational/Global';

const StyledPopup = styled.div`
  width: 200px;
  position: absolute;
  left: ${(props) => props.x + 'px'}
  top: ${(props) => props.y + 'px'}
  z-index: 3;
  transform:  translateX(20%) translateY(-50%);
  background-color: rgba(255,255,255,0.8);
  border-radius: 5px;
  padding: 5px 0;
  pointer-events: none;

   h3,p {
   ${NoSelect}
    margin: 5px;
    line-height: 15px;
    font-size: 17px;
    color: #000;
    text-align: center;
  }
`;

class DonationPopup extends React.Component {
  shouldComponentUpdate = (newProps) => {
    if (!this.props.donation || !newProps.donation) {
      return true;
    }
    if (this.props.donation.id === newProps.donation.id) {
      return false;
    }
    return true;
  };

  render() {
    if (this.props.hide || this.props.showDonate) {
      return '';
    }
    return (
      <StyledPopup x={this.props.x} y={this.props.y}>
        <h3>{this.props.donation.username}</h3>
        <p>{new Date(this.props.donation.timestamp).toDateString()}</p>
      </StyledPopup>
    );
  }
}

export default DonationPopup;

export const OldDonationPopup = ({ donation, x, y, hide }) => {
  if (hide) {
    return '';
  }

  console.log('rendering', donation);

  return (
    <StyledPopup x={x} y={y}>
      <h3>{donation.username}</h3>
      <p>Nov. 19, 2019</p>
    </StyledPopup>
  );
};

const Success = styled.div`
  position: absolute;
  top: 33%;
  left: 10%;
  width: 390px;
  height: 280px;
  padding: 60px 30px 20px 30px;
  background-color: rgba(255, 255, 255, 0.8);
  // border-radius: 10px;
  font-size: 20px;
  z-index: 2;
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
  width: 50px;
  height: 50px;
`;

const MiniIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const TextInfo = styled.p`
  font-size: 15px;
  color: #7c7c7c;

  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;

export const SuccessPopup = ({ donation, hide, onHome }) => {
  if (hide) {
    return '';
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDay() + 1}/${date
      .getFullYear()
      .toString()
      .substring(2, 4)}`;
  };

  const getModelName = () => {
    if (donation.type.includes('tree')) {
      return 'tree';
    } else if (donation.type.includes('coral')) {
      return 'coral';
    } else if (donation.type.includes('crops')) {
      return 'crop';
    } else {
      return 'object';
    }
  };

  return (
    <Success>
      <Row>
        <p style={{ fontSize: '20px' }}>
          <b>{donation.username}</b> {formatDate(donation.timestamp)}
        </p>
      </Row>
      <Row>
        <Icon src="check.svg" />
      </Row>
      <Row space-around style={{ lineHeight: '30px' }}>
        Your virtual {getModelName()} has been successfully planted.
      </Row>
      <Row onClick={onHome} style={{ marginTop: '50px' }}>
        <MiniIcon src="home.svg" />
        <TextInfo>Go Home</TextInfo>
      </Row>
    </Success>
  );
};
