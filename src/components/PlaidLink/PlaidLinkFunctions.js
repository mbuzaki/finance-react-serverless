const jsonParseResults = (cleaned, 
                        sortedTransactions, 
                        receiveSortedArray,
                        receiveTransactions) => {
    /* Used in PlaidLink component after the transactions
    are returned from Plaid. The results from the serverless
    function come in the form of a string. For that reason, 
    this function turns the results back into JSON and
    then sent to update the global state.
    
    @parameters: 
        - cleaned: array of transaction objects - need to be parsed
        - sortedTransactions: 2D array of trx for each category
        - receiveSortedArray: function to reducer fn global state
        - receiveTransactions: functino to reducer fn global state
    **I pass the individual functions rather than the userInfo store 
    object because I figured these functions would be lighter weight
    than the entire global store obj.
    
    @returns:  none, dispatches changes to global state. Any
    components that subscribe to the global state will re-render
    when the changes are made.
        */
    var transactions = []
    var sortedTransactionsResult = []
    var i;
    var item;
    for(i = 0; i < cleaned.length; i++){
        item = JSON.parse(cleaned[i]);
        transactions.push(item);
    };
    var k;
    var j;
    for(k = 0; k < sortedTransactions.length; k++){
        var subArray = sortedTransactions[k]
        var cat = []
        for(j=0; j < subArray.length; j++) { 
            item = JSON.parse(subArray[j]);
            cat.push(item);
        }
        sortedTransactionsResult.push(cat);
    };
    receiveSortedArray(sortedTransactionsResult);
    receiveTransactions(transactions);
}

export { jsonParseResults };