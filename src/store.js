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
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'UPDATE_TRANSACTIONS':
        /* Adds one or more transactions to the provider props. 
        The true operation concatenates the existing array and
        the incoming array. Yes, this reducer expects an array!
        The reasonig behind this is that there is likely to be more
        than one transaction moving around in this case */
        const newState = {transactions: state.transactions.concat(action.payload)};
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }