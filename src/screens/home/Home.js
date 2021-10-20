import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, Checkbox, TextField, Card, CardContent, CardHeader, FormControl, Input, InputLabel, Button } from '@mui/material/';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core/';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles/';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Link } from 'react-router-dom';
import Header from "../../common/Header";
import '../home/Home.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [Relmovies, setRelMovies] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Artists, setArtists] = useState([]);
  const [filterForm, setfilterForm] = useState({
    fMovie: '',
    fGenres: [],
    fArtists: []
  });
  const [ReleaseS, setReleaseS] = useState("");
  const [ReleaseE, setReleaseE] = useState("");
  const releaseDateStartHandler = event => {
    setReleaseS(event.target.value);
  }
  const releaseDateEndHandler = event => {
    setReleaseE(event.target.value);
  }
  const inputFilterChangedHandler = (e) => {
    const state = filterForm;
    state[e.target.name] = e.target.value;
    setfilterForm({ ...state })

  }


  const relMovieHandler = () => {
    let queryString = "?status=RELEASED";
    if (fMovie !== "") {
      queryString += "&title=" + fMovie;
    }
    if (fGenres.length > 0) {
      queryString += "&genre=" + encodeURIComponent(fGenres.toString());
    }
    if (fArtists.length > 0) {
      queryString += "&artists=" + encodeURIComponent(fArtists.toString());
    }
    if (ReleaseS !== "") {
      queryString += "&start_date=" + ReleaseS
    }
    if (ReleaseE !== "") {
      queryString += "&end_date=" + ReleaseE
    }

    let dataFilter = null;
    let xhrFilter = new XMLHttpRequest();
    xhrFilter.onreadystatechange = () => {
      if (xhrFilter.readyState === 4) {
        setRelMovies(JSON.parse(xhrFilter.responseText).movies);
      }
    };
    console.log(props.baseUrl + "movies" + queryString)
    xhrFilter.open("GET", props.baseUrl + "movies" + queryString);
    xhrFilter.setRequestHeader("Cache-Control", "no-cache");
    xhrFilter.send(dataFilter);
  }


  const theme = useTheme();
  const cardtheme = createTheme({

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            marginLeft: 90,
            minWidth: 240,
            maxWidth: 240,
            height: 'auto'
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            color: theme.palette.primary.light
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            marginTop: 25,
            color: 'primary',
            backgroundColor: 'primary'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            marginTop: 0,
            paddingTop: 0
          }
        }
      }
    }
  });
  async function loadMovieData() {

    try {
      const rawResponse = await fetch(props.baseUrl + 'movies?page=1&limit=10', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      const result = await rawResponse.json();
      setMovies(result.movies);
      setRelMovies(result.movies.filter((item) => item.status === 'RELEASED'));

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
  async function loadGenreData() {

    try {
      const rawResponse = await fetch(props.baseUrl + 'genres', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      const result = await rawResponse.json();
      let mGenres = [];
      result.genres.forEach((item) => mGenres.push(item.genre));
      setGenres([...new Set(mGenres)]);

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
  async function loadArtistData() {

    try {
      const rawResponse = await fetch(props.baseUrl + 'artists?page=1&limit=10', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      const result = await rawResponse.json();
      let mArtists = [];
      result.artists.map((item) => mArtists.push(item.first_name + ' ' + item.last_name));
      setArtists([...new Set(mArtists)]);

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
  useEffect(() => {
    loadMovieData();
  }, [])
  useEffect(() => {
    loadGenreData();
  }, [])
  useEffect(() => {
    loadArtistData();
  }, [])
  const { fMovie, fGenres, fArtists } = filterForm;
  return (
    <Fragment>
      <div>
        <Header baseUrl={props.baseUrl} showButton="false"></Header>
      </div>
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
      <div className="releasedMoviesnfilter">
        <div className="releasedMovies">
          <GridList cellHeight={350} cols={4} style={{ width: '80%' }} >
            {Relmovies.map((Movie) => (
              <GridListTile key={Movie.id}  >
                <Link to={`/movie/${Movie.id}`}>
                  <img style={{ cursor: 'pointer' }} src={Movie.poster_url} alt={Movie.title} />
                  <GridListTileBar title={Movie.title}
                    subtitle={`Release Date:Fri ${new Date(Movie.release_date).toDateString()}`} />
                </Link>
              </GridListTile>

            )

            )}
          </GridList>
        </div>
        <div className="filter">
          <ThemeProvider theme={cardtheme}>
            <Card elevation={10} >

              <CardHeader
                classes={{ title: cardtheme.components.MuiCardHeader.styleOverrides.title }}
                titleTypographyProps={{ variant: 'h6' }}
                title="FIND MOVIES BY:" />

              <CardContent style={{ marginTop: '0px', paddingTop: '0px' }}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
                  <Input id="component-simple" name="fMovie" value={fMovie} onChange={inputFilterChangedHandler} />
                </FormControl>

                <Autocomplete

                  multiple
                  id="checkboxes-tags-demo"
                  options={Genres}
                  disableCloseOnSelect
                  value={fGenres}
                  onChange={(e, val) => {
                    if (val !== null) {
                      const state = filterForm;
                      state['fGenres'] = val;
                      setfilterForm({ ...state });

                    }
                  }}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ marginRight: 0 }}>
                      <Checkbox
                        id={`id-${option}`}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginLeft: 0 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 180 }}
                  renderInput={(params) => (
                    <TextField {...params} variant='standard' label="Genres" />
                  )}
                />
                <Autocomplete

                  multiple
                  id="checkboxes-tags-demo"
                  options={Artists}
                  disableCloseOnSelect
                  value={fArtists}
                  onChange={(e, val) => {
                    if (val !== null) {
                      const state = filterForm;
                      state['fArtists'] = val;
                      setfilterForm({ ...state });

                    }
                  }}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ marginRight: 0 }}>
                      <Checkbox
                        id={`id-${option}`}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginLeft: 0 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 180 }}
                  renderInput={(params) => (
                    <TextField {...params} variant='standard' label="Artists" />
                  )}
                />

                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple" shrink>Release Date Start</InputLabel>
                  <TextField id="component-simple" variant='standard' type="date" sx={{ width: 180, paddingTop: 2 }} name="ReleaseS" value={ReleaseS} onChange={releaseDateStartHandler} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple" shrink>Release Date End</InputLabel>
                  <TextField id="component-simple" variant='standard' type="date" sx={{ width: 180, paddingTop: 2 }} name="ReleaseE" value={ReleaseE} onChange={releaseDateEndHandler} />
                </FormControl>
                <div>
                  <Button fullWidth className={cardtheme.components.MuiButton.styleOverrides.root} type='submit' variant="contained" onClick={relMovieHandler}>APPLY</Button>
                </div>

              </CardContent>
            </Card>
          </ThemeProvider>
        </div>
      </div>
    </Fragment>

  )
}

export default Home;