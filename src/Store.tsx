import React from 'react';
import { Episode } from './App';

interface IState {
  episodes: Episode[],
  favorites: Episode[]
}

const initialState:IState = {
  episodes: [],
  favorites: [],
};

export interface IAction {
  type: string;
  payload: any;
}
const Store = React.createContext<IState | any>(initialState);

function reducer(state:IState, action:IAction):IState {
  console.log(action.payload, '<<<');

  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, episodes: action.payload };
    case 'FAV_EPISODE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_EPISODE':
      return { ...state, favorites: action.payload };
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
