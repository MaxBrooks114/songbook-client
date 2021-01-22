import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpotifyTracks } from '../../actions/spotify';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minWidth: 349,
    margin: 'auto',

    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 1000
    }),
    width: 349,

    "&:hover": {
       transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: 500
    }),

    width: 467,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        
      },

       '&.Mui-focused fieldset': { 
          borderColor: theme.palette.info.main,
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 0
  
    },
  },

  input: {
    color: 'white',
    background: theme.palette.info.light,
    opacity: '.4',
    textAlign: 'center',
     
  },

  searchIcon: {
    color: theme.palette.primary.main,
  },

  label: {
    color: theme.palette.info.light,
    opacity: '.6',
    '&.shrink': {           
           display: 'none'
          },
      },
}));

const SpotifySearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const input = useRef(null);
  const classes = useStyles();

 

  return (
        <form className={classes.root}          
          onSubmit={(e) => {
            e.preventDefault();
            input.current.lastChild.firstChild.value = ''
            dispatch(fetchSpotifyTracks(query));
            setQuery('')
          }}
        >
            <TextField
              label="Search Spotify"
              size="small"
              variant="outlined"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              margin="dense"
              fullWidth
              notched= {false}
              ref= {input}
              InputProps={{
                endAdornment: <InputAdornment position="end"><IconButton type="submit"><SearchRoundedIcon className={classes.searchIcon} /></IconButton></InputAdornment>,
                className: classes.input,
                notched: false
              }}
              InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
            />
        </form>
  );
};

export default SpotifySearchBar;
