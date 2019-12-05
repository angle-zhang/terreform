import { getGatewayKey } from './globalGiving';

export const initBraintree = (onSubmit, onLoaded) => {
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
        // const onSubmit = (event) => {
        //   event.preventDefault();
        //   hostedFieldsInstance.tokenize((err, payload) => {
        //     if (err) console.error(err);
        //     console.log('Nonce:', payload.nonce);
        //     setNonce(payload.nonce);
        //   });
        // };
        form.addEventListener('submit', onSubmit(hostedFieldsInstance), false);
        // setLoadingForm(false);
        onLoaded();
      }
    );
  };
};
