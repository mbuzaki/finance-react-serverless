import React, { useContext, useEffect } from 'react';
import { API } from "aws-amplify";
// Import Context
import { store } from '../../store.js'

const jsonParseResults = (cleaned, sortedTransactions, userInfo) => {
    console.log('entering parsing fn..')
    console.log(cleaned);
    console.log('sorted trx' + sortedTransactions)
    
    var transactions = []
    var sortedTransactions = []
    var i;
    var item;
    for(i = 0; i < cleaned.length; i++){
        item = JSON.parse(cleaned[i]);
        transactions.push(item);
    };
    console.log('second loop...')
    var k;
    var j;
    for(k = 0; k < sortedTransactions.length; k++){
        console.log('entered second loop..')
        var subArray = sortedTransactions[k]
        var cat = []
        for(j=0; j < subArray.length; j++){ 
            item = JSON.parse(subArray[j]);
            cat.push(item);
        }
        sortedTransactions.push(cat);
    };
    console.log('function complete..')
    console.log(sortedTransactions);
    console.log(transactions);
    userInfo.receiveSortedArray(sortedTransactions);
    userInfo.receiveTransactions(transactions);
}

export { jsonParseResults };