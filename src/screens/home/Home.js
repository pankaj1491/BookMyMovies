import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete, Checkbox, TextField, Card, CardContent, CardHeader, FormControl, Input, InputLabel, Button } from '@mui/material/';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core/';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles/';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Header from "../../common/Header";
import '../home/Home.css';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [Relmovies, setRelMovies] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Artists, setArtists] = useState([]);
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
            marginTop: 25
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
      },
      // MuiAutocomplete:{
      //   styleOverrides:{
      //   root:{
      //    marginTop:100 
      //   }
      // }
      // }
    }
  });
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
  async function loadGenreData() {

    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/genres', {
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
      console.log(result.genres);

    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
  async function loadArtistData() {

    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/artists?page=1&limit=10', {
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
    setRelMovies(movies.filter((item) => item.status === 'RELEASED'));
  }, [movies])
  useEffect(() => {
    loadGenreData();
  }, [])
  useEffect(() => {
    loadArtistData();
  }, [])



  return (
    <Fragment>
      <div>
        <Header></Header>
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
          <GridList cellHeight={350} cols={4} >
            {Relmovies.map((Movie) => (
              <GridListTile key={Movie.id} >
                <img style={{ cursor: 'pointer' }} src={Movie.poster_url} alt={Movie.title} />
                <GridListTileBar title={Movie.title}
                  subtitle={`Release Date:Fri ${Movie.release_date}`} />
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

              <CardContent className={cardtheme.components.MuiCardContent.styleOverrides.root}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
                  <Input id="component-simple" />
                </FormControl>

                <Autocomplete

                  multiple
                  id="checkboxes-tags-demo"
                  options={Genres}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ marginRight: 0 }}>
                      <Checkbox
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
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ marginRight: 0 }}>
                      <Checkbox
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
                  <TextField id="component-simple" variant='standard' type="date" sx={{width:180,paddingTop:2}} />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple" shrink>Release Date End</InputLabel>
                  <TextField id="component-simple" variant='standard' type="date" sx={{width:180,paddingTop:2}} />
                </FormControl>
                <div>
                  <Button fullWidth className={cardtheme.components.MuiButton.styleOverrides.root} type='submit' color='primary' variant="contained">APPLY</Button>
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