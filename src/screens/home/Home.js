import React, { Fragment, useState, useEffect } from "react";
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Header from "../../common/Header";
import './Home.css';
const Home = (props) => {
  const [movies, setMovies] = useState([]);

  async function loadMovieData() {

    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=10', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      const result = await rawResponse.json();
      setMovies(result.movies);

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
  useEffect(() => {
    loadMovieData();
  }, [])
  return (
    <Fragment>
      <div>
        <Header></Header>
        <div>
          <div className="upcomingMoviesHeader">Upcoming Movies</div>
          <div className="upcomingMovies">
            <GridList cellHeight={250} cols={6} style={{ flexWrap: 'nowrap' }}>
              {movies.map((movie) => (
                <GridListTile key={movie.id}>
                  <img src={movie.poster_url} alt={movie.title} />
                  <GridListTileBar title={movie.title} />
                </GridListTile>
              )
              )}
            </GridList>
          </div>
        </div>
      </div>
    </Fragment>

  )
}
export default Home;