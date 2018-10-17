import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import logo from '../img/logo.png'
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  avatar: {
    height: 75,
    width: 75,
  },
  iconContainer: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '2rem'
    }
  },
  img: {
    margin: 0,
  },
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      textAlign: 'center',
    },
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  }
});

const Navbar = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Avatar
          component={Link}
          to="/"
          src={logo}
          className={classes.avatar}
          classes={{ img: classes.img }}
        />
        <Typography
          component={Link}
          to="/"
          color="inherit"
          variant="h3"
          className={classes.title}
        >
          The WebDev Coach
        </Typography>
        <div>
          <IconButton
            className={classes.iconContainer}
            color="inherit"
            href="https://www.github.com/AryanJ-NYC"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </IconButton>
          <IconButton
            className={classes.iconContainer}
            color="inherit"
            href="https://twitter.com/thewebdevcoach"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </IconButton>
          <IconButton
            className={classes.iconContainer}
            color="inherit"
            href="https://www.youtube.com/channel/UCERIxMohPPYmwjtHF3DdlJQ"
            target="_blank"
          >
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
