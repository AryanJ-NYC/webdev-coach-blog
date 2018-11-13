import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../img/logo.png'
import Navbar from './Navbar';

const styles = theme => ({
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

const Header = ({ classes }) => (
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
        <div></div>
      </Toolbar>
      <Navbar />
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
