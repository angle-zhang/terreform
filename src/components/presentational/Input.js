import styled from 'styled-components';

const Input = styled.div`
  width: 100%;
  margin: 0 10px;

  label {
    position: absolute;
    margin: -55px 0 0 10px;
    font-size: 14px;
    color: #777;
    transition: all 0.2s;
  }

  input,
  textarea {
    width: 98%;
    height: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 8px 0;
    padding: 27px 0 10px 10px;
    background-color: #eee;
    border: 2px solid transparent;
    border-radius: ${(props) => (props.static ? '0px' : '5px')};
    transition: border-radius 0.2s, box-shadow 0.2s;
  }

  textarea {
    height: 50px;
    width: 99%;
    resize: none;
    outline: none;
  }

  textarea + label {
    margin: -95px 0 0 10px;
  }

  input:focus,
  textarea:focus {
    box-shadow: 0 2px 0 #222;
    border-radius: 5px 5px 0px 0px;
  }

  input:focus + label,
  textarea:focus + label {
    color: #222;
  }

  input:focus {
    outline: none;
  }
`;

export const FullInput = styled(Input)`
  & input {
    width: 99%;
  }
  input,
  textarea {
    border-radius: ${(props) => (props.static ? '0px' : '5px')};
  }
`;

export const BraintreeForm = styled.div`
  visibility: ${(props) => (props.loading ? 'hidden' : 'visible')};

  label {
    position: absolute;
    margin-top: -60px;
    margin-left: 17%;
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

  .braintree-hosted-fields-focused {
    box-shadow: 0 2px 0 #222;
    border-radius: 5px 5px 0px 0px !important;
  }

  .braintree-hosted-fields-focused + label {
    color: #222;
  }

  .loading svg {
    margin-top: 75px;
    visibility: ${(props) => (props.loading ? 'visible' : 'hidden')};
  }

  .button-container input {
    padding: 10px 23px;
    margin-right: -20px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #fff;
    background-color: rgba(130, 167, 127, 1);
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  }

  .button-container input:hover {
    background-color: rgba(130, 167, 127, 0.7);
    cursor: pointer;
  }

  .button-container input:focus {
    outline: none;
  }
`;

export const Dropdown = styled.button`
  background-color: #ebebeb;
  border-radius: 4px;
  width: ${(props) => props.width};
`;

export const DropdownItems = styled.div`
  display: ${(props) => (props.display ? 'block' : 'none')};
  position: absolute;
  background-color: #f1f1f1;
  color: black;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownItem = styled.a`
  width: 100%;
  padding: 2px;
  text-decoration: none;
  display: block;
  cursor: pointer;
`;

export default Input;
