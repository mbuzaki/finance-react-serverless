import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { API } from "aws-amplify";

const PlaidLink = (props) => {
  
  const onSuccess = async function(token, metadata) {
    const data = {
      body: {
      public_token: token
    }
  }
    const resp = await API.post('plaidaccessapi', '/accessToken', data);
    console.log(resp.body);
  }


  const config = {
    token: props.token,
    onSuccess
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div>
        <div>
            <button onClick={open()} disabled={!ready}>
            Connect a bank account
            </button>
        </div>
        <div>
            <button onClick={console.log('wtf2')}>
            Get Transactions
            </button>
        </div>
    </div>

  );
};
export default PlaidLink;