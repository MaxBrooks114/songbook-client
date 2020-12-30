import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpotifyTracks } from '../../actions/spotify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    width: 'auto',
    marginRight: '20px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        
      },

       '&.Mui-focused fieldset': { 
          borderColor: theme.palette.primary.light,
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
    
    }
  },

  input: {
    color: theme.palette.background.default,
    background: theme.palette.info.light,
    opacity: '.4',
    textAlign: 'center',
   
   
    
  },

  searchIcon: {
    padding: '6px',
    color: theme.palette.background.default,
  },

  label: {
    color: theme.palette.info.light,
    opacity: '.6',
    marginLeft: '45px',
    '&.shrink': {
           transform: 'translate(-30px, -6px) scale(0.75)',
           transition: '.2 ease-out',
           opacity: '1',
           display: 'none'
          },
      },
}));

const SpotifySearchBar = ({showButton}) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const input = useRef(null);
  console.log(input)
  const classes = useStyles();

 

  return (
    <>
      <Grid container  justify="center" >
        <form className={classes.root}
          onSubmit={(e) => {
            e.preventDefault();
            input.current.lastChild.firstChild.value = ''
            dispatch(fetchSpotifyTracks(query));
            setQuery('')
          }}
        >
          <Grid item>
            <TextField
              label="Search Spotify"
              size="small"
              variant="outlined"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              margin="dense"
              ref= {input}
              InputProps={{
                endAdornment: <InputAdornment position="end"><IconButton className={classes.searchIcon} type="submit"><SearchRoundedIcon/></IconButton></InputAdornment>,
                className: classes.input,
              }}
              InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
            />
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default SpotifySearchBar;
