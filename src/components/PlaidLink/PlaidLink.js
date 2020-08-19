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
      const data = {
        body: {
          transactions: trx
        }
      }
      API.post('cleanandcategorizeapi', '/cleanandcategorize', data).then(res => {
        // jsonParseResults(res.cleaned, res.sortedTransactions, userInfo);
        // userInfo.updateCategories(res.categories);
        // userInfo.updateKeywords(res.keywords)
        
        var transactions = []
        var sortedTransactions = []
        var i;
        var j;
        var item;
        for(i = 0; i < res.cleaned.length; i++){
          item = JSON.parse(res.cleaned[i]);
          transactions.push(item);
        };
        for(i = 0; i < res.sortedTransactions.length; i++){
          var subArray = res.sortedTransactions[i]
          var cat = []
          for(j=0; j < subArray.length; j++){ 
            item = JSON.parse(subArray[j]);
            cat.push(item);
          }
          sortedTransactions.push(cat);
        };
        userInfo.receiveSortedArray(sortedTransactions);
        userInfo.updateCategories(res.categories);
        userInfo.updateKeywords(res.keywords)
        userInfo.receiveTransactions(transactions);
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