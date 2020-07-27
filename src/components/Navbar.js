import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const Navbar = () => {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      background: "white",
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
    },

    link: {
      margin: theme.spacing(1, 1.5),
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          SongBook
        </Typography>
        <nav>
          <Link variant="button" component={RouterLink} color="textPrimary" to="/songs" className={classes.link}>
            Songs
          </Link>
          <Link variant="button" color="textPrimary" component={RouterLink} to="/songs/new" className={classes.link}>
            New Song
          </Link>
          <Link variant="button" color="textPrimary" component={RouterLink} to="/search" className={classes.link}>
            Spotify Search
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
