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
    console.log(resp);
  }

  const getTransactions = function() {
    API.get('getransactionsapi', '/transactions').then(res => {
      console.log(res.msg.transactions);
    });
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
            <button onClick={getTransactions}>
            Get Transactions
            </button>
        </div>
    </div>

  );
};
export default PlaidLink;