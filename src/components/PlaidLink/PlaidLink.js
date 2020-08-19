import React, { useContext, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { API } from "aws-amplify";
// Import Context
import { store } from '../../store.js'
import { jsonParseResults } from './PlaidLinkFunctions';

const PlaidLink = (props) => {
  var linkToken = props.token
  const userInfo = useContext(store)
  
  const onSuccess = function(token, metadata) {
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
    API.post('plaidaccessapi', '/accessToken', data).then(res => {
      console.log(res.success)
    });
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
      const trx = res.msg.transactions
      console.log(trx)
      const data = {
        body: {
          transactions: trx
        }
      }
      API.post('cleanandcategorizeapi', '/cleanandcategorize', data).then(res => {
        jsonParseResults(res.cleaned, res.sortedTransactions,
                userInfo.receiveSortedArray, userInfo.receiveTransactions);
        userInfo.updateCategories(res.categories);
        userInfo.updateKeywords(res.keywords)
        console.log(res.cleaned);
        console.log(res.categories)
      })
    });
  }

  const config = {
    token: linkToken,
    onSuccess
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div>
        <div>
            <button onClick={() => {
               open();
               linkToken = 'null'}} disabled={!ready}>
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