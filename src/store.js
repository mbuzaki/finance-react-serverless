import React, {createContext, useReducer} from 'react';

const initialState = {
    transactions: [],
    categories: [],
    keywords: [],
    data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
      }
};

const actions = {
  updateTransactions: "UPDATE_TRANSACTIONS",
  receiveTransactions: "RECEIVE_TRANSACTIONS",
  updateCategories: "UPDATE_CATEGORIES",
  updateKeywords: "UPDATE_KEYWORDS",
  updateData: "UPDATE_DATA"
};

const store = createContext(initialState);
const { Provider } = store;

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


    default:
      return {...state};
  };
}

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    transactions: state.transactions,
    categories: state.categories,
    keywords: state.keywords,
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 500]]
    },
    updateTransactions: value => {dispatch(
      {type: actions.updateTransactions, payload: value})
    },
    receiveTransactions: value => {dispatch(
      {type: actions.receiveTransactions, payload: value})
    },
    updateCategories: value => {dispatch(
      {type: actions.updateCategories, payload: value})
    },
    updateKeywords: value => {dispatch(
      {type: actions.updateKeywords, payload: value})
    },
    updateData: value => {dispatch(
      {type: actions.updateData, payload: value})
    }
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider }