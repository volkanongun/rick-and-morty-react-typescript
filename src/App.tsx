import React, { useContext, useEffect } from 'react';
import './App.css';
import Store from './Store';

type Episode = {
  id: number;
  name: string;
  image: {
    medium: string;
  };
  season: string;
  summary: string;
  url: string;
}

const App:React.FC = () => {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      // eslint-disable-next-line no-underscore-dangle
      payload: dataJSON._embedded.episodes,
    });
  };

  useEffect(() => {
    fetchDataAction();
  }, []);

  return (
    <>
      <h1 className="App">Rick And Morty</h1>
      <p>Pick your favourite episode</p>
      <section>
        {state.episodes.map((episode:Episode) => (
          <article key={episode.id}>
            <h2>{episode.name}</h2>
            <img src={episode.image.medium} alt={`Rick & Morty ${episode.name}`} />
            <section>
              Season:
              {' '}
              <cite>{episode.season}</cite>

            </section>
            <div dangerouslySetInnerHTML={{ __html: episode.summary }} />
          </article>
        ))}
      </section>
    </>
  );
};

export default App;
