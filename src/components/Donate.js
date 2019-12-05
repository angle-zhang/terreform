import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Navbar from './Nav';
import { makeDonation, getGatewayKey } from '../globalGiving';
import { Loading } from './presentational/Other';

/* custom field hook */
const useField = (type, init = '') => {
  const [value, setValue] = useState(init);

  const onChange = (e) => setValue(e.target.value);

  return [{ type, value, onChange }, setValue];
};

const TextDetail = styled.div`
  text-align: left;
  color: #000;

  & h1,
  p {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  & h1 {
    font-size: 36px;
  }

  & p {
    font-family: 'Nunito Pro', sans-serif;
    font-size: 15px;
    margin-bottom: 30px;
    line-height: 28px;
  }
`;

const Overlay = styled.div`
  background-color: rgba(56, 56, 56, 0.5);
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const Centered = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 25px;

  text-align: justify;
  height: 70%;
  width: 490px;
  margin-left: calc(50% - 265px);
  overflow: auto;
  overflow-x: hidden;
  padding: 70px 40px 40px 40px;
  z-index: 4;

  &::-webkit-scrollbar {
    display: none;
  }

  & h2,
  h3,
  p {
    text-align: ${(props) => (props['center-text'] ? 'center' : 'justify')};
  }

  & h3,
  p {
    font-size: 17px;
    margin: 0 30px;
  }
`;

const Icon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  margin-left: 460px;
  margin-top: -50px;
  padding: 10px;
  border-radius: 30px;

  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
`;

const Row = styled.div`
  width: 74%;
  margin-left: 13%;
  display: flex;
  justify-content: ${(props) => (props['flex-end'] ? 'flex-end' : 'center')};
  align-items: center;
`;

const Error = styled.div`
  color: #e91e63;
  width: 100%;
  margin-left: -10px;
  font-size: 17px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.2s;
`;

const Divider = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 22px;
  margin: 15px 14.5%;
  width: 74%;
`;

const Input = styled.div`
  width: 100%;
  margin: 0 10px;

  & label {
    position: absolute;
    margin: -55px 0 0 15px;
    font-size: 14px;
    color: #777;
    transition: all 0.2s;
  }

  & textarea {
    resize: vertical;
    outline: none;
  }

  & input,
  textarea {
    width: 98%;
    height: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px 0;
    padding: 27px 0 10px 10px;
    background-color: #eee;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border-radius, box-shadow 0.2s;
  }

  & input:focus {
    box-shadow: 0 2px 0 #222;
    border-radius: 5px 5px 0px 0px;
  }

  & input:focus + label {
    color: #222;
  }

  & input:focus {
    outline: none;
  }
`;

const FullInput = styled(Input)`
  & input {
    width: 99%;
  }
`;

const Form = styled.div`
  visibility: ${(props) => (props.loading ? 'hidden' : 'visible')}

  label {
    position: absolute;
    margin-top: -60px;
    margin-left: 15%;
    font-size: 14px;
    color: #777;
    transition: all 0.2s;
  }

  #card-number,
  #expiration-date,
  #cvv,
  #postal-code {
    width: 343px;
    height: 15px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 16px 0 16px 71px;
    padding: 23px 0 8px 10px;
    background-color: #eee;
    border: 2px 2px 0 2px solid transparent;
    border-radius: 5px;
    transition: all 0.2s;
  }

  #card-number:hover,
  #expiration-date:hover,
  #cvv:hover,
  #postal-code:hover {
    // box-shadow: 0 2px 0 #222;
    // border-radius: 5px 5px 0px 0px;
  }

  .braintree-hosted-fields-focused {
    box-shadow: 0 2px 0 #222;
    border-radius: 5px 5px 0px 0px !important;
  }

  .braintree-hosted-fields-focused +label {
    color: #222;
  }

  // #card-number:hover + label,
  // #expiration-date:hover + label,
  // #cvv:hover + label,
  // #postal-code:hover + label {
  //   color: #222;
  // }

  .loading svg {
    margin-top: 75px;
    visibility: ${(props) => (props.loading ? 'visible' : 'hidden')}
  }

  & .button-container input {
    padding: 10px 23px;
    // margin-top: 10px;
    margin-right: -20px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: ${(props) => (props.disabled ? '#ccc' : '#fff')}
    background-color: ${(props) =>
      props.disabled ? '#eee' : 'rgba(130, 167, 127, 1);'}
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: ${(props) =>
      props.disabled ? '' : '0 1px 2px 0 rgba(0, 0, 0, 0.2)'};
    transition: all 0.25s;
  }

  & .button-container input:hover {
    background-color: ${(props) =>
      props.disabled ? '#eee' : 'rgba(130, 167, 127, 0.7);'}
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }

  & .button-container input:focus {
    outline: none;
  }
`;

const Option = styled.div`
  height: 100px;
  width: 50%;
  margin: 10px 0;
  margin-left: 10px;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? '#222' : '#eee')};
  color: ${(props) => (props.selected ? '#fff' : '#222')};
  font-size: 35px;
  font-weight: bold;

  & input {
    font-family: 'SF Pro', sans-serif;
    font-size: 30px;
    padding: 5px;
    position: relative;
    background-color: #fff;
    border: none;
    width: 50px;
    height: 35px;
    border-radius: 10px;
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & input:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) => (props.selected ? '#222' : '#ddd')};
    cursor: pointer;
  }
`;

const Donate = ({ id, optionArr, onClose, description, title }) => {
  const [projectId, setId] = useField('number', id);
  const [amount, setAmount] = useField('number');
  const [customAmount, setCustomAmount] = useState('');
  const [firstname, setFirst] = useField('text');
  const [lastname, setLast] = useField('text');
  const [email, setEmail] = useState('');
  const [nonce, setNonce] = useState('');

  const [invalidInput, setInvalidInput] = useState(true);
  const [loadingForm, setLoadingForm] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState({ status: false });
  const [error, setError] = useState('');

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    onClose();
  };

  optionArr = optionArr.length ? optionArr : [[{ amount: 10 }, { amount: 30 }]];

  const checkInvalid = () => {
    const validInputs = document.getElementsByClassName(
      'braintree-hosted-fields-valid'
    );
    if (validInputs.length !== 4) {
      return 'Invalid payment information.';
    } else if (!firstname.value || !lastname.value) {
      return 'Missing name.';
    } else if (!amount.value) {
      return 'Select an amount.';
    } else if (!email) {
      return 'Missing email.';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return 'Invalid email.';
    }
    return '';
  };

  const donate = async (nonce) => {
    setProcessing(true);
    try {
      const res = await makeDonation({
        firstname: firstname.value,
        lastname: lastname.value,
        email,
        amount: parseInt(amount.value),
        projectId: parseInt(projectId.value),
        nonce: nonce
      });
      console.log(res.data);
      setSuccess({ status: true, donation: res.data.donation });
    } catch (err) {
      console.error(err);
      onClose();
      setTimeout(
        () =>
          alert(
            'There was a problem with your transaction! If the problem persists, please contact us.'
          ),
        250
      );
    }
    setAmount('');
    setFirst('');
    setLast('');
    setEmail('');
    setProcessing(false);
  };

  useEffect(() => {
    if (nonce) {
      donate(nonce);
    }
  }, [nonce]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  useEffect(() => {
    const form = document.querySelector('#cardForm');
    const authorization = getGatewayKey();

    braintree.client.create({ authorization }, (err, clientInstance) => {
      if (err) {
        console.error(err);
        return;
      }
      createHostedFields(clientInstance);
    });

    const createHostedFields = (clientInstance) => {
      braintree.hostedFields.create(
        {
          client: clientInstance,
          styles: {
            input: {
              'font-size': '16px',
              'font-family': 'courier, monospace',
              'font-weight': 'lighter',
              color: '#ccc'
            },
            '.valid': {
              color: 'rgba(130, 167, 127, 1)'
            },
            '.invalid': {
              color: '#e91e63'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '1234'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'MM/YYYY'
            },
            postalCode: {
              selector: '#postal-code',
              placeholder: '11111'
            }
          }
        },
        (err, hostedFieldsInstance) => {
          const teardown = (event) => {
            event.preventDefault();
            hostedFieldsInstance.tokenize((err, payload) => {
              if (err) console.error(err);
              console.log('Nonce:', payload.nonce);
              setNonce(payload.nonce);
            });
          };

          form.addEventListener('submit', teardown, false);
          setLoadingForm(false);
        }
      );
    };
  }, []);

  const removedRow = (
    <Row>
      <Input>
        <input {...projectId} />
        <label>Project ID</label>
      </Input>
      <Input>
        <input {...amount} />
        <label>Amount</label>
      </Input>
    </Row>
  );

  if (success.status) {
    return (
      <div>
        <Overlay />
        <Centered ref={node} center-text>
          <Icon src="close.svg" onClick={onClose} />
          <h2>Thank You.</h2>
          <h3>
            You have successfully donated ${success.donation.amount}! Your
            receipt number is "{success.donation.receipt.receiptNumber}".
          </h3>
          <p>
            <em>Click the tree above to plant yours.</em>
          </p>
          <p>
            Your contribution will help plant more trees, build more homes,
            improve air quality, and protect our oceans. With every donation,
            another tree is planted.
          </p>
        </Centered>
      </div>
    );
  }

  if (processing) {
    return (
      <div>
        <Overlay />
        <Centered ref={node}>
          <Icon src="close.svg" onClick={onClose} />
          <h3
            style={{
              textAlign: 'center',
              marginTop: '40%',
              marginBottom: '15%'
            }}
          >
            Confirming Purchase
          </h3>
          <Row>
            <Loading />
          </Row>
        </Centered>
      </div>
    );
  }

  return (
    <div>
      <Overlay />
      <Centered ref={node}>
        <Icon src="close.svg" onClick={onClose} />
        <TextDetail>
          <h3>{title}</h3>
          <br />
          <p>{description}</p>
          <br />
        </TextDetail>

        {optionArr.map((options, i) => (
          <Row key={options[0].amount}>
            {options.map((option) => (
              <Option
                key={option.amount}
                onClick={() => {
                  setAmount(option.amount);
                }}
                selected={amount.value === option.amount}
              >
                ${option.amount}
              </Option>
            ))}
            {i === optionArr.length - 1 ? (
              <Option
                onClick={() => {
                  setAmount(customAmount);
                }}
                selected={customAmount && amount.value === customAmount}
              >
                $
                <input
                  type="number"
                  min={1}
                  value={customAmount}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setCustomAmount(parseInt(e.target.value));
                      setAmount(parseInt(e.target.value));
                    }
                  }}
                />
              </Option>
            ) : (
              ''
            )}
          </Row>
        ))}
        <Divider>Your Information</Divider>
        <Row>
          <Input>
            <input {...firstname} />
            <label>First Name</label>
          </Input>
          <Input>
            <input {...lastname} />
            <label>Last Name</label>
          </Input>
        </Row>
        <Row>
          <FullInput>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <label>Email</label>
          </FullInput>
        </Row>
        <Row>
          <FullInput>
            <textarea />
            <label>Message (optional)</label>
          </FullInput>
        </Row>
        <Divider>Payment Information</Divider>
        <Form className="demo-frame" loading={loadingForm}>
          <Row className="loading">
            <Loading />
          </Row>
          <form action="/" method="post" id="cardForm">
            <div id="card-number" className="hosted-field" />
            <label className="hosted-fields--label" htmlFor="card-number">
              Card Number
            </label>

            <div id="expiration-date" className="hosted-field" />
            <label className="hosted-fields--label" htmlFor="expiration-date">
              Expiration Date
            </label>

            <div id="cvv" className="hosted-field" />
            <label className="hosted-fields--label" htmlFor="cvv">
              CVV
            </label>

            <div id="postal-code" className="hosted-field" />
            <label className="hosted-fields--label" htmlFor="postal-code">
              Postal Code
            </label>

            <Row>
              <Error show={error}>{error}</Error>
              <div className="button-container">
                <input
                  type="submit"
                  className="button button--small button--green"
                  value="Contribute"
                  id="submit"
                  onClick={(e) => {
                    const err = checkInvalid();
                    if (err) {
                      e.preventDefault();
                      setError('');
                      setTimeout(() => {
                        setError(err);
                      }, 200);
                      return;
                    }
                  }}
                />
              </div>
            </Row>
          </form>
        </Form>
      </Centered>
    </div>
  );
};

export const CardDonate = styled(Donate)``;

export default Donate;
