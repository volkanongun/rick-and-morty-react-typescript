import React from 'react';

interface IState {
  episodes: [],
  favorites: []
}

const initialState:IState = {
  episodes: [],
  favorites: [],
};

interface IAction {
  type: string;
  payload: any;
}
const Store = React.createContext<IState | any>(initialState);

function reducer(state:IState, action:IAction):IState {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { children } = props;

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}

export default Store;
