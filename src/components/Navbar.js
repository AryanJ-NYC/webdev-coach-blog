import React from 'react';
import { Link } from 'gatsby';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faMedium, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    borderTop: `1px ${theme.palette.secondary.main} solid`,
    display: 'grid',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto auto',
      justifyContent: 'flex-end',
    },
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  link: {
    height: '100%',
    padding: '1rem 1.2rem',
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
      padding: '1rem 1.5rem',
      '&:before': {
        content: '""',
        width: '1px',
        background: theme.palette.secondary.main,
        height: '100%',
        left: 0,
        position: 'absolute',
        transform: 'skew(-20deg)',
        top: 0,
        bottom: 0,
      },
    },
    '&:after': {
      height: '2px',
      background: theme.palette.secondary.main,
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
    justifyContent: 'space-around',
    [theme.breakpoints.up('sm')]: {
      '&:before': {
        content: '""',
        width: '1px',
        background: theme.palette.secondary.main,
        height: '100%',
        left: 0,
        position: 'absolute',
        transform: 'skew(-20deg)',
        top: 0,
        bottom: 0,
      },
    },
  },
});

function Navbar({ classes }) {
  return (
    <div className={classes.container}>
      <div className={[classes.linkContainer]}>
        <Typography className={classes.link} component={Link} to="/blog" color="inherit">
          Blog
        </Typography>
        <Typography className={classes.link} component={Link} to="/ask-a-question" color="inherit">
          Ask A Question
        </Typography>
      </div>
      <div className={classes.socialMedia}>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://www.github.com/AryanJ-NYC"
          target="_blank"
        >
          <SvgIcon>
            <FontAwesomeIcon icon={faGithub} />
          </SvgIcon>
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://twitter.com/aryanjabbari"
          target="_blank"
        >
          <SvgIcon>
            <FontAwesomeIcon icon={faTwitter} />
          </SvgIcon>
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://www.youtube.com/channel/UCERIxMohPPYmwjtHF3DdlJQ"
          target="_blank"
        >
          <SvgIcon>
            <FontAwesomeIcon icon={faYoutube} />
          </SvgIcon>
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://www.twitch.tv/aryanjabbari"
          target="_blank"
        >
          <SvgIcon>
            <FontAwesomeIcon icon={faTwitch} />
          </SvgIcon>
        </IconButton>
        <IconButton
          className={classes.iconContainer}
          color="inherit"
          href="https://medium.com/@aryanjabbari"
          target="_blank"
        >
          <SvgIcon>
            <FontAwesomeIcon icon={faMedium} />
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(Navbar);
