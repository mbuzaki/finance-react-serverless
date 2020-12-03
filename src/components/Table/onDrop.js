const onDropFunction = (e, index, userInfo) => {
    /*
    This is the procedure triggered when an 'unhandled'
    transaction is dropped into a specified category list.

    1) The item is converted to plain text, so we turn
    it back into an array
    2) Use the info on this transaction to get its #id
    3) Get the original transaction in the global state,
    and do a few things:
        - change its category to where its been sorted
        - take its associated merchant_name, and 
        put it in the working keywords list
        - put the transaction in the sortedTransactions
        nested array for proper location in the list-view

    @returns: none - just updates global state. I will use 
    React Lifecycle hooks/methods to trigger an update in 
    DynamoDB once the user leaves the that screen-view. 
    My reasoning for this is that I dont wana hit that 
    update endpoint 18 times as they sort manually. Upload
    all the changes when the user is done butchering their
    spending spree.

    @e: the event of the drop. Like I promised, we get
    the data from dataTransfer when the drop event occurs

    @index: this index came from when we made a tab for
    each transaction. Use the index to get the right 
    nested array for sortedTransactions and keywords.

    @userInfo: userInfo global state that I am manipulating.
    Grabbing out the data, changing it, then dispatching
    an action that the reducers will permanently change
    in the global state. I have reservations about passing 
    this big guy around. This is just the first iteration
    of dev tho.
    */
    var item = e.dataTransfer.getData('text/plain')
    const array = item.split(',')
    var bigTrxArray = userInfo.transactions
    var categoryKeywords = userInfo.keywords
    var trx = bigTrxArray[array[0]-1]
    var categoryTrx = userInfo.sortedTransactions


    categoryKeywords[index].push(trx.merchantName)
    trx.category = userInfo.categories[index]

    categoryTrx[index].push(trx)
    userInfo.updateKeywords(categoryKeywords)
    userInfo.receiveTransactions(bigTrxArray)
    userInfo.receiveSortedArray(categoryTrx)
    console.log(userInfo)
  }

export { onDropFunction }