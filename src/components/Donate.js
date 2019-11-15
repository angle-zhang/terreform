import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Nav';
import { makeDonation } from '../globalGiving';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => setValue(e.target.value);

  return { type, value, onChange };
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  background-color: #00c853;
  padding: 10px 23px;
  margin-top: 10px;
  margin-right: -10px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.25s, background-color 0.25s;

  &:hover {
    background-color: #69f0ae;
    cursor: pointer;
  }
`;

const Centered = styled.div`
  text-align: justify;
  height: 100%;
  width: 70%;
  margin: auto;

  & h3,
  p {
    margin-left: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.div`
  width: 100%;
  margin: 0px 20px;

  & label {
    position: absolute;
    margin-top: -55px;
    margin-left: 20px;
    font-size: 14px;
    color: #777;
    transition: all 0.25s;
  }

  & input {
    width: 100%;
    height: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px;
    padding: 10px;
    padding-top: 27px;
    background-color: #eee;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.25s;
  }

  & input:hover {
    border-bottom: 2px solid #00e676;
    border-radius: 5px 5px 0px 0px;
  }

  & input:focus {
    outline: none;
  }

  & input:hover + label {
    color: #00e676;
  }
`;

const Form = styled.div`
  label {
    position: absolute;
    margin-top: -65px;
    margin-left: 37px;
    font-size: 14px;
    color: #777;
    transition: all 0.25s;
  }

  #card-number,
  #expiration-date,
  #cvv,
  #postal-code {
    width: 97%;
    height: 15px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px;
    margin-left: 25px;
    margin-bottom: 15px;
    padding: 10px;
    padding-top: 27px;
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
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #fff;
    background-color: #00c853;
    padding: 10px 23px;
    margin-top: 10px;
    margin-right: -10px;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border 0.25s, background-color 0.25s;
  }

  .button-container input:hover {
    background-color: #69f0ae;
    cursor: pointer;
  }

  .button-container input:focus {
    outline: none;
  }
`;

const Donate = () => {
  const projectId = useField('number');
  const amount = useField('number');
  const firstname = useField('text');
  const lastname = useField('text');
  // const email = useField('email');
  const [email, setEmail] = useState('');
  const [nonce, setNonce] = useState('');

  const donation = (nonce) => {
    console.log('email', email, 'name', firstname);
    makeDonation({
      firstname: firstname.value,
      lastname: lastname.value,
      email,
      amount: parseInt(amount.value),
      projectId: parseInt(projectId.value),
      nonce: nonce
    });
  };

  useEffect(() => {
    const form = document.querySelector('#cardForm');
    const authorization = 'sandbox_9qxtj3s4_346mrgcqwkppmnhx';

    braintree.client.create(
      {
        authorization: authorization
      },
      (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        createHostedFields(clientInstance);
      }
    );

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
              // donation(payload.nonce);
              setNonce(payload.nonce);
            });
          };

          form.addEventListener('submit', teardown, false);
        }
      );
    };
  }, []);

  useEffect(() => {
    console.log(nonce, email);
    if (nonce) {
      donation(nonce);
    }
  }, [nonce]);

  return (
    <div>
      <Navbar />
      <Centered>
        <h3>The Earth Needs a Good Friend</h3>
        <p style={{ lineHeight: '40px' }}>
          When you support Friends of the Earth, you fuel the fight to protect
          people and the planet over corporate profits. Together, we’re working
          to build a system that promotes clean energy and solutions to climate
          change. We’re fighting for a truly safe and healthy food system. And
          we’re protecting marine ecosystems and the people who live and work
          near them.
        </p>
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
          <Input>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <label>Email</label>
          </Input>
        </Row>
        <Form className="demo-frame">
          <form action="/" method="post" id="cardForm">
            <div id="card-number" className="hosted-field"></div>
            <label className="hosted-fields--label" htmlFor="card-number">
              Card Number
            </label>

            <div id="expiration-date" className="hosted-field"></div>
            <label className="hosted-fields--label" htmlFor="expiration-date">
              Expiration Date
            </label>

            <div id="cvv" className="hosted-field"></div>
            <label className="hosted-fields--label" htmlFor="cvv">
              CVV
            </label>

            <div id="postal-code" className="hosted-field"></div>
            <label className="hosted-fields--label" htmlFor="postal-code">
              Postal Code
            </label>

            <Row>
              <div className="button-container">
                <input
                  type="submit"
                  className="button button--small button--green"
                  value="Contribute"
                  id="submit"
                />
              </div>
            </Row>
          </form>
        </Form>
      </Centered>
    </div>
  );
};

export default Donate;
