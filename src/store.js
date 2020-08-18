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
  updateCategories: "UPDATE_CATEGORIES",
  updateKeywords: "UPDATE_KEYWORDS",
  updateData: "UPDATE_DATA"
};

const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TRANSACTIONS':
      /* Adds one or more transactions to the provider props. 
      The true operation concatenates the existing array and
      the incoming array. Yes, this reducer expects an array!
      The reasonig behind this is that there is likely to be more
      than one transaction moving around in this case */
      return {...state, transactions: state.transactions.push(action.payload)};
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
      {type: actions.updateTransactions, value})
    },
    updateCategories: value => {dispatch(
      {type: actions.updateCategories, value})
    },
    updateKeywords: value => {dispatch(
      {type: actions.updateKeywords, value})
    },
    updateData: value => {dispatch(
      {type: actions.updateData, value})
    }
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider }