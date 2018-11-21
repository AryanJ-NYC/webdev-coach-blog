import React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core';
import EmailAddressSubmissionForm from './EmailAddressSubmissionForm';

const styles = theme => ({
  rootContainer: {
    background: theme.palette.secondary.main,
    padding: '10%',
    marginTop: '2vh',
    transform: 'rotate(-1.5deg)',
  },
  textContainer: {
    transform: 'rotate(1.5deg)',
  },
});

function CallToAction({ classes, headerColor = "primary" }) {
  return (
    <Grid justify="center" style={{ overflow: 'hidden' }} container>
      <Grid xs={11} md={8} className={classes.rootContainer} item>
        <div className={classes.textContainer}>
          <Typography color={headerColor} variant="h4" gutterBottom>Join My Mailing List</Typography>
          <Typography gutterBottom>
            I'm currently working on a <strong>Web Development Starter Kit</strong>. It will be a pack of content
            that'll set you on the right path to leave that 💩 job and learn the foundational concepts needed to be a
            web developer.
          </Typography>
          <Typography gutterBottom>
            For an email on when that's released, join my mailing list!
          </Typography>
          <EmailAddressSubmissionForm />
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(CallToAction);
