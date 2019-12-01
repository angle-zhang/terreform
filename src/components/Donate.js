import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navbar from './Nav';
import { makeDonation, getGatewayKey } from '../globalGiving';

/* custom field hook */
const useField = (type, init = '') => {
  const [value, setValue] = useState(init);

  const onChange = (e) => setValue(e.target.value);

  return [{ type, value, onChange }, setValue];
};

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

  &::-webkit-scrollbar {
    display: none;
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
`;

const Input = styled.div`
  width: 100%;
  margin: 0 10px;

  & label {
    position: absolute;
    margin: -55px 0 0 15px;
    font-size: 14px;
    color: #777;
    transition: all 0.25s;
  }

  & input {
    width: 98%;
    height: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px 0;
    padding: 27px 0 10px 10px;
    background-color: #eee;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.25s;
  }

  & input:hover {
    border-bottom: 2px solid #00e676;
    border-radius: 5px 5px 0px 0px;
  }

  & input:hover + label {
    color: #00e676;
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
  label {
    position: absolute;
    margin-top: -65px;
    margin-left: 15%;
    font-size: 14px;
    color: #777;
    transition: all 0.25s;
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
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.25s;
  }

  #card-number:hover,
  #expiration-date:hover,
  #cvv:hover,
  #postal-code:hover {
    border-bottom: 2px solid #00e676;
    border-radius: 5px 5px 0px 0px;
  }

  #card-number:hover + label,
  #expiration-date:hover + label,
  #cvv:hover + label,
  #postal-code:hover + label {
    color: #00e676;
  }

  .button-container input {
    padding: 10px 23px;
    margin-top: 10px;
    margin-right: -10px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #fff;
    background-color: #00c853;
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.25s;
  }

  .button-container input:hover {
    background-color: #388e3c;
    cursor: pointer;
  }

  .button-container input:focus {
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
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? '#00d26c' : '#eee')};
  font-size: 30px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#00d26c' : '#ddd')};
    cursor: pointer;
  }
`;

const Donate = ({ id, optionArr, onClose, description, title }) => {
  const [projectId, setId] = useField('number', id);
  const [amount, setAmount] = useField('number');
  const [firstname, setFirst] = useField('text');
  const [lastname, setLast] = useField('text');
  const [email, setEmail] = useState('');
  const [nonce, setNonce] = useState('');

  optionArr = optionArr.length ? optionArr : [[{ amount: 10 }, { amount: 30 }]];

  const donate = async (nonce) => {
    const res = await makeDonation({
      firstname: firstname.value,
      lastname: lastname.value,
      email,
      amount: parseInt(amount.value),
      projectId: parseInt(projectId.value),
      nonce: nonce
    });
    console.log(res.data);
  };

  useEffect(() => {
    if (nonce) {
      donate(nonce);
    }
  }, [nonce]);

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
            ':focus': {
              color: 'black',
              border: '3px solid blue'
            },
            '.valid': {
              color: '#8bdda8'
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

  return (
    <div>
      <Overlay />
      <Centered>
        <Icon src="close.svg" onClick={onClose} />
        <h3>{title}</h3>
        <br />
        <p style={{ lineHeight: '28px', textAlign: 'left' }}>{description}</p>
        <br />
        {optionArr.map((options) => (
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
          </Row>
        ))}
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
        <Form className="demo-frame">
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

            <div className="button-container" style={{ marginLeft: '70%' }}>
              <input
                type="submit"
                className="button button--small button--green"
                value="Contribute"
                id="submit"
              />
            </div>
          </form>
        </Form>
      </Centered>
    </div>
  );
};

export const CardDonate = styled(Donate)``;

export default Donate;
