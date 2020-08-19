import React, {createContext, useReducer} from 'react';
import { reducer, actions } from './reducers/userInfoReducer';
import { StaticRouter } from 'react-router-dom';

const initialState = {
    transactions: [],
    categories: [],
    keywords: [],
    sortedTransactions:[],
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

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    transactions: state.transactions,
    categories: state.categories,
    keywords: state.keywords,
    sortedTransactions: state.sortedTransactions,
    data: state.data,
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
    },
    receiveSortedArray: value => {dispatch(
      {type: actions.receiveSortedArray, payload: value})
    }
  };

  return <Provider value={value}>{children}</Provider>;
};

export { store, StateProvider }