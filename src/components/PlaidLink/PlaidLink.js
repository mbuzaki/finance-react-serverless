import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { API } from "aws-amplify";

const PlaidLink = (props) => {
  
  const onSuccess = useCallback((token, metadata) => {
    const resp = API.post('plaidaccessapi', '/accessToken', {
      public_token: token,
    });
    console.log(resp)
    linked = true;
  }, []);

  const linked = false;

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
            <button onClick={console.log('wtf2')} disabled={linked}>
            Get Transactions
            </button>
        </div>
    </div>

  );
};
export default PlaidLink;