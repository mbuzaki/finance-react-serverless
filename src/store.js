import React, {createContext, useReducer} from 'react';
import { reducer, actions } from './reducers/userInfoReducer';
import { StaticRouter } from 'react-router-dom';

const initialState = {
    transactions: [],
    categories: [],
    keywords: [],
    sortedTransactions:[],
    data: {}
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