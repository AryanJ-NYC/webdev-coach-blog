import React from 'react';
import { Link } from 'gatsby';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    borderTop: `1px ${theme.palette.secondary.main} solid`,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  linkContainer: {
    display: 'flex',
  },
  link: {
    height: '100%',
    fontSize: '0.75rem',
    padding: '1rem 1.2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
      padding: '1rem 1.5rem',
    },
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    '&:before': {
      content: '""',
      width: '1px',
      background: `${theme.palette.secondary.main}`,
      height: '100%',
      left: 0,
      position: 'absolute',
      transform: 'skew(-20deg)',
      top: 0,
      bottom: 0,
    },
    '&:after': {
      height: '2px',
      background: `${theme.palette.secondary.main}`,
      content: '""',
      width: '0',
      position: 'absolute',
      transform: 'translateX(-50%)',
      transition: 'width 0.5s',
      transitionTimingFunction: 'cubic-bezier(1, -0.65, 0, 2.31)',
      left: '50%',
      marginTop: '2rem',
    },
    '&:hover, &:focus': {
      outline: 'none',
      '&:after': {
        width: 'calc(100% - 60px)',
      },
    },
  },
  socialMedia: {
    display: 'flex',
    position: 'relative',
    paddingLeft: '0.75rem',
    '&:before': {
      content: '""',
      width: '1px',
      background: `${theme.palette.secondary.main}`,
      height: '100%',
      left: 0,
      position: 'absolute',
      transform: 'skew(-20deg)',
      top: 0,
      bottom: 0,
    },
  },
});

function Navbar({ classes }) {
  return (
    <div className={classes.container}>
      <div></div>
      <div className={[classes.linkContainer]}>
        <Typography className={classes.link} component={Link} to="/blog" color="inherit">Blog</Typography>
        <Typography className={classes.link} component={Link} to="/subscribe" color="inherit">Subscribe</Typography>
      </div>
      <div className={classes.socialMedia}>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://www.github.com/AryanJ-NYC"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} />
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://twitter.com/aryanjabbari"
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://www.youtube.com/channel/UCERIxMohPPYmwjtHF3DdlJQ"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </IconButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(Navbar);
