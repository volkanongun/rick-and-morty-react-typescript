import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Store, { IAction } from './Store';

export type Episode = {
  id: number;
  name: string;
  image: {
    medium: string;
  };
  season: string;
  summary: string;
  url: string;
}

const EpisodeComp = styled.article`
  background: #efefef;
  display: inline-block;
  width: 250px;
  margin: 0 1rem 1rem 0;
  padding: 1rem;

  h2{
    font-size: 20px;
    margin: 0;
  }
`;

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

  const handleClick = (episode:Episode):IAction => {
    const episodeInFav: boolean = state.favorites.includes(episode);

    let dispatchObject = {
      type: 'FAV_EPISODE',
      payload: episode,
    };

    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter((fav:Episode) => fav.id !== episode.id);
      dispatchObject = {
        type: 'REMOVE_EPISODE',
        payload: favWithoutEpisode,
      };
    }

    return dispatch(dispatchObject);
  };

  console.log(state);

  return (
    <>
      <div>
        <h1 className="App">Rick And Morty</h1>
        <p>Pick your favourite episode</p>
      </div>
      <div>
        Favorite(s) :
        {' '}
        {state.favorites.length}
      </div>
      <section>
        {state.episodes.map((episode:Episode) => (
          <EpisodeComp>
            <article key={episode.id}>
              <h2>{episode.name}</h2>
              <img src={episode.image.medium} alt={`Rick & Morty ${episode.name}`} />
              <section>
                Season:
                {' '}
                <cite>{episode.season}</cite>

              </section>
              {/* <div dangerouslySetInnerHTML={{ __html: episode.summary }} /> */}
              <div>
                <button type="button" onClick={() => handleClick(episode)}>
                  <span>{state.favorites.find((fav: Episode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}</span>
                </button>

              </div>
            </article>
          </EpisodeComp>
        ))}
      </section>
    </>
  );
};

export default App;
