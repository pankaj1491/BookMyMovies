import React, { Fragment, useState, useEffect } from "react";
import { Autocomplete,Checkbox, TextField, Card, CardContent, CardHeader,  FormControl, Input, InputLabel, Button } from '@mui/material/';
import {GridList,GridListTile,GridListTileBar} from '@material-ui/core/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Header from "../../common/Header";
import '../home/Home.css';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [Relmovies, setRelMovies] = useState([]);

  const theme = createTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      text: {
        primary: '#42a5f5'
      }
    }
  })
  const cardtheme = createTheme({
    overrides: {
      MuiCard: {
        root: {
          marginLeft: 90,
          minWidth: 240,
          maxWidth: 240,
          height: 'auto'
        }
      },
      MuiButton: {
        root: {
          marginTop: 25
        }
      },
      MuiCardContent: {
        root: {
          marginTop: 0,
          paddingTop: 1
        }
      },
      MuiAutocomplete:{
        root:{
         marginTop:100 
        }
      }
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
  useEffect(() => {
    loadMovieData();
  }, [])
  useEffect(() => {
    setRelMovies(movies.filter((item) => item.status === 'RELEASED'));
  }, [movies])

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
              <ThemeProvider theme={theme}>
                <CardHeader
                  //  classes={{title: theme.components.MuiCardHeader.styleOverrides.title,root:theme.components.MuiCardHeader.styleOverrides.root}}
                  titleTypographyProps={{ variant: 'h6' }}
                  title="FIND MOVIES BY:" />
              </ThemeProvider>
              <CardContent className={cardtheme.overrides.MuiCardContent.root}>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
                  <Input id="component-simple" />
                </FormControl>

                  <Autocomplete

                    multiple
                    //  PopperComponent={CustomPopper}
                    id="checkboxes-tags-demo"
                    options={top100Films}
                    disableCloseOnSelect
                    classes={{root:cardtheme.overrides.MuiAutocomplete.root}}
                    // disableListWrap
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => (
                      <li {...props} style={{ marginRight: 0 }}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginLeft: 0 }}
                          checked={selected}
                        />
                        {option.title}
                      </li>
                    )}
                     style={{ width: 150  }}
                    renderInput={(params) => (
                      <TextField {...params} variant='standard' label="Genres"  />
                    )}
                  />
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Artists</InputLabel>
                  <Input id="component-simple" />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Release Date Start</InputLabel>
                  <Input id="component-simple" />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-simple">Release Date End</InputLabel>
                  <Input id="component-simple" />
                </FormControl>
                <div>
                  <Button fullWidth className={cardtheme.overrides.MuiButton.root} type='submit' color='primary' variant="contained">APPLY</Button>
                </div>

              </CardContent>
            </Card>
          </ThemeProvider>
        </div>
      </div>
    </Fragment>

  )
}
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
export default Home;