import React from "react";
import { Field, reduxForm } from "redux-form";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/styles";
import genres from "./genres";
import keys from "./keys";
import "./SongForm.css";

const renderTextField = ({ rows, multiline, inputAdornment, classes, input, label, ...custom }) => {
  return (
    <TextField
      label={label}
      size="small"
      color="secondary"
      variant="outlined"
      margin="dense"
      multiline={multiline}
      rows={rows}
      autoComplete="off"
      InputProps={{
        endAdornment: <InputAdornment position="end">{inputAdornment}</InputAdornment>,
        className: classes.value,
      }}
      InputLabelProps={{ className: classes.label }}
      {...input}
      {...custom}
    />
  );
};

const renderAutoCompleteField = ({ value, options, classes, input, label, ...custom }) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          color="secondary"
          variant="outlined"
          value={value}
          margin="dense"
          InputProps={{ ...params.InputProps, className: classes.autoComplete }}
          InputLabelProps={{ className: classes.label }}
          {...input}
          {...custom}
        />
      )}
    />
  );
};

const renderCheckbox = ({ classes, input, label }) => (
  <FormControlLabel
    className={classes.label}
    label={label}
    labelPlacement="start"
    control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} name="original" />}
  />
);

const SongForm = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: "#D31DEA",
      width: "85%",
      marginTop: "2rem",
      marginLeft: "1rem",

      "& .MuiOutlinedInput-root": {
        width: 250,
        "& fieldset": {
          borderColor: "#294C77",
        },
        "&:hover fieldset": {
          borderColor: "rgb(254,123,235, 1)",
        },
      },
      "& .MuiInputAdornment-root .MuiTypography-colorTextSecondary": {
        color: "#D31DEA",
      },
    },

    value: {
      color: "#D31DEA",
    },

    autoComplete: {
      color: "#D31DEA",
      width: "20%",
      "& .MuiAutocomplete-root": {
        width: 250,
      },
    },

    button: {
      color: "white",
      marginTop: "1rem",
      background: "linear-gradient(90deg, rgb(254,182,48,1) 0%,  rgb(254,123,235, 1) 100%)",
      "&:hover": {
        background: "rgba(8,199,251,1)",
        color: "rgba(86,3,114,1)",
      },
    },

    label: {
      color: "#D31DEA",
    },

    lyrics: {
      "& .MuiInputBase-root": {
        width: 800,
      },
    },

    listbox: {
      background: theme.palette.background.default,
    },
    option: {
      color: "#D31DEA",
      textTransform: "capitalize",
      // Hover
      '&[data-focus="true"]': {
        background: "rgba(8,199,251,1)",
      },
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} direction="row">
        <form className={classes.root}>
          <Grid item>
            <Field classes={classes} name="title" component={renderTextField} label="Title" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="artist" component={renderTextField} label="Artist" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="album" component={renderTextField} label="Album" />
          </Grid>
          <Grid item>
            <Field
              options={genres.sort((a, b) => (a.name > b.name ? 1 : -1))}
              classes={classes}
              name="genre"
              component={renderAutoCompleteField}
              label="Genre"
            />
          </Grid>
          <Grid item>
            <Field options={keys} classes={classes} name="key" component={renderAutoCompleteField} label="Key" />
          </Grid>
          <Grid item>
            <Field
              options={[{ name: "major" }, { name: "minor" }]}
              classes={classes}
              name="mode"
              component={renderAutoCompleteField}
              label="Mode"
            />
          </Grid>
          <Grid item>
            <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="time_signature" component={renderTextField} label="Time Signature" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
          </Grid>
          <Grid item>
            <Field
              fullWidth
              classes={classes}
              className={classes.lyrics}
              name="lyrics"
              multiline
              rows={8}
              component={renderTextField}
              label="Lyrics"
            />
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Create Song
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

const reduxSongForm = reduxForm({
  form: "SongForm",
})(SongForm);

export default reduxSongForm;
