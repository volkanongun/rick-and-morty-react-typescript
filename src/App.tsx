import React, { useContext } from 'react';
import './App.css';
import Store from './Store';

const App:React.FC = () => {
  const store = React.useContext(Store);
  return (
    <>
      {console.log(store)}
      <div className="App">Rick And Morty</div>
      <p>Pick your favourite episode</p>
    </>
  );
};

export default App;
