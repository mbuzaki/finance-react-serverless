const actions = {
    updateTransactions: "UPDATE_TRANSACTIONS",
    receiveTransactions: "RECEIVE_TRANSACTIONS",
    updateCategories: "UPDATE_CATEGORIES",
    updateKeywords: "UPDATE_KEYWORDS",
    updateData: "UPDATE_DATA",
    receiveSortedArray: "UPDATE_SORTED"
  };

const reducer = (state, action) => {
    switch(action.type) {
      case actions.updateTransactions:
        // Adds one or more transactions to the provider props
        return {...state, transactions: state.transactions.push(action.payload)};
      case actions.receiveTransactions:
        return {...state, transactions: action.payload};
      case actions.updateCategories:
        return {...state, categories: action.payload};
      case actions.updateKeywords:
        return {...state, keywords: action.payload};
      case actions.receiveSortedArray:
        return {...state, sortedTransactions: action.payload}
      default:
        return {...state};
    };
  }

export { reducer, actions };