import React, { useState } from 'react';

import { TextDetail } from '../presentational/Global';
import { Overlay, Content, SubContent } from '../presentational/Wrapper';
import { GreenLink, Close } from '../presentational/Button';

const StaticContact = (props) => {
  return (
    <Overlay display={props.display ? 1 : 0}>
      <Close src="close.svg" onClick={props.close} static={true} />
      <TextDetail>
        <h1>Contact Us</h1>
      </TextDetail>
      <SubContent>
        <TextDetail>
          <p>
            Thank you for showing interest in our project. If you are interested
            in contacting us via email, please click on the button below to
            shoot us an email! We look forward towards hearing from you.{' '}
          </p>
        </TextDetail>
        <GreenLink href="mailto:terreform.19@gmail.com">
          Email Terreform
        </GreenLink>
      </SubContent>
    </Overlay>
  );
};

export default StaticContact;
