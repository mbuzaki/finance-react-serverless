import React, { useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { API } from "aws-amplify";

const PlaidLink = (props) => {
  
  const onSuccess = async function(token, metadata) {
    // This function is automatically called when the user
    // properly authenticates his or her self. The "token"
    // parameter is handed over straight from the Link, so
    // dont worry about handling in any other functions

    //@trigger: authentication in the Plaid Link
    const data = {
      body: {
      public_token: token
    }
  }
    // This API invokes a function just to store the user's access token
    // no response from here. The access token gets use all the information
    // in the linked bank account
    const resp = await API.post('plaidaccessapi', '/accessToken', data);
  }

  const getTransactions = function() {
    // Gets transactions from linked account
    // @trigger: Get Transactions button
    /* Returns array of huge transaction objects, then
    passed to the next function. Second function extracts
    the information we want, and categorizes based on the
    latest categories and keywords. 

    @returns: array of transaction json objects*/
    
    API.get('getransactionsapi', '/transactions').then(res => {
      console.log(res.msg.transactions);
      const trx = res.msg.transactions
      const data = {
        body: {
          transactions: trx
        }
      }
      API.post('cleanandcategorizeapi', '/cleanandcategorize', data).then(res => {
        var transactions = []
        var i;
        var item;
        for(i = 0; i < res.cleaned.length; i++){
          item = JSON.parse(res.cleaned[i]);
          transactions.push(item);
        };
      })
    });
  }

  const config = {
    token: props.token,
    onSuccess
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