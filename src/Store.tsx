import React from 'react';

const Store = React.createContext('');

const initialState = {};

function reducer() {

}

export function StoreProvider(props: any) {
  return <Store.Provider value="test">{props.children}</Store.Provider>;
}

export default Store;
