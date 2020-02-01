import { getGatewayKey } from './globalGiving';

const braintreeOptions = {
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
};

export const initBraintree = async (onSubmit, onLoaded) => {
  const form = document.querySelector('#cardForm');
  const authorization = getGatewayKey();
  const createClient = (authorization) =>
    braintree.client.create({ authorization });

  const createHostedFields = (clientInstance) =>
    braintree.hostedFields.create({
      client: clientInstance,
      ...braintreeOptions
    });

  const handleSubmit = (hostedFieldsInstance) => {
    form.addEventListener('submit', onSubmit(hostedFieldsInstance), false);
    onLoaded();
    return () =>
      form.removeEventListener('submit', onSubmit(hostedFieldsInstance), false);
  };

  const clientInstance = await createClient(authorization);
  const hostedFieldsInstance = await createHostedFields(clientInstance);
  const res = await handleSubmit(hostedFieldsInstance);
  return res;
};
