import React from 'react';
import withRoot from '../../withRoot';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Coaching() {
  return (
    <Grid justify="center" container>
      <Grid xs={11} md={8} item>
        <Typography color="secondary" variant="h2" align="center" gutterBottom>
          Coaching
        </Typography>
        <Typography gutterBottom>
          Looking to leave that soul-sucking job and break into the web development industry? Need accountability and mentorship?
        </Typography>
        <Typography gutterBottom>I will lay out the path to a new job as a web developer. With my program, you will learn:</Typography>
        <Typography gutterBottom>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Front-end JavaScript</li>
            <li>Node.js (with Express)</li>
          </ul>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withRoot(Coaching);
