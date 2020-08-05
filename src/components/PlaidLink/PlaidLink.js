import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { API } from "aws-amplify";

const PlaidLink = (props) => {

  // async function getPublicToken(token) {
  //     try {
  //         await API.post('plaidapi', '/plaidAccessToken', {
  //           public_token: token
  //         });
  //     } catch (err) {console.log({err})};
  // }

  
  const onSuccess = useCallback((token, metadata) => {
    console.log('great success')
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
            <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
            </button>
        </div>
        <div>
            <button onClick={getTransactions} disabled={linked}>
            Get Transactions
            </button>
        </div>
    </div>

  );
};
export default PlaidLink;