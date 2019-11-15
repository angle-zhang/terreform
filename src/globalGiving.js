let API_KEY = 'fa55f6a9-b3f4-464e-a6d7-aa15591f3cbf';
let API_TOKEN = '';

export const getProjectIds = async () => {
  const projectUrl = `https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=${API_KEY}`;

  const res = await axios.get(projectUrl);
  console.log(res.data);
};

export const setToken = (token) => {
  API_TOKEN = token;
  console.log(API_TOKEN);
};

export const getToken = async () => {
  const tokenUrl = 'https://api.globalgiving.org/api/userservice/tokens';

  const res = await fetch(
    tokenUrl,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        auth_request: {
          user: {
            email: 'angelazhang1220@gmail.com',
            password: 'WB69NZyLpVmWWLa'
          },
          api_key: API_KEY
        }
      })
    },
    { headers: { 'Acces-Control-Allow-Origin': '*' } }
  );
  const json = await res.json();
  return json.auth_response.access_token;
};

export const makeDonation = async ({
  firstname,
  lastname,
  email,
  amount,
  projectId,
  nonce
}) => {
  const donationUrl = `https://api.globalgiving.org/api/secure/givingservice/donationsclient?api_key=${API_KEY}&api_token=${API_TOKEN}&is_test=true`;

  const res = await axios.post(donationUrl, {
    donation: {
      refcode: '1l2312k31lk',
      transactionId: 'k34jl23k4jl3kj',
      email,
      amount,
      project: {
        id: projectId
      },
      signupForGGNewsletter: false,
      signupForCharityNewsletter: false,
      payment_detail: {
        firstname,
        lastname,
        paymentGateway: 'braintree',
        paymentGatewayKey: 'sandbox_9qxtj3s4_346mrgcqwkppmnhx',
        paymentGatewayNonce: nonce
      }
    }
  });
  console.log(res.data);
  return res.data;
};
