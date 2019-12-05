import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Processing, Success } from './DonateScreens';
import DonateForm from './DonateForm';
import { TextDetail } from './presentational/Global';

const TextDescription = styled(TextDetail)`
  color: #000;

  h3 {
    text-align: center;
    font-size: 17px;
  }

  p {
    max-height: none;
    margin: 30px;
    text-align: justify;
    line-height: 28px;
    font-size: 15px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(56, 56, 56, 0.5);
`;

const Centered = styled.div`
  position: absolute;
  height: 70%;
  width: 490px;
  padding: 70px 40px 40px 40px;
  margin-left: calc(50% - 265px);
  background-color: #fff;
  border-radius: 25px;
  overflow: auto;
  overflow-x: hidden;
  z-index: 4;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Close = styled.img`
  position: absolute;
  margin-left: 460px;
  margin-top: -50px;
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 30px;

  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
`;

const Donate = ({ id, optionArr, onClose, description, title }) => {
  const [donationStatus, setStatus] = useState({
    status: 'default',
    donation: {}
  });

  const node = useRef();

  const clickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    onClose();
  };

  optionArr = optionArr.length ? optionArr : [[{ amount: 10 }, { amount: 30 }]];

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  let contentComponent = '';
  switch (donationStatus.status) {
    case 'processing':
      contentComponent = <Processing />;
      break;
    case 'success':
      contentComponent = <Success donation={donationStatus.donation} />;
      break;
    default:
      contentComponent = (
        <>
          <TextDescription>
            <h3>{title}</h3>
            <p>{description}</p>
          </TextDescription>

          <DonateForm id={id} amountArr={optionArr} setStatus={setStatus} />
        </>
      );
  }

  return (
    <div>
      <Overlay />
      <Centered ref={node}>
        <Close src="close.svg" onClick={onClose} />
        {contentComponent}
      </Centered>
    </div>
  );
};

export const CardDonate = styled(Donate)``;

export default Donate;
