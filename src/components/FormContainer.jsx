import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

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

function FormContainer({ children, classes }) {
  return (
    <Grid justify="center" container>
      <Grid xs={11} md={8} className={classes.rootContainer} item>
        <div className={classes.textContainer}>{children}</div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(FormContainer);
