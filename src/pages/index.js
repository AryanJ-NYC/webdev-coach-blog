import React from 'react'
import withRoot from '../withRoot';
import { withStyles, Grid, Typography } from '@material-ui/core';
import CallToAction from '../components/CallToAction';

const styles = () => ({
  rootContainer: {
    height: 'max-content',
    marginTop: '-2vh'
  }
});

function IndexPage({ classes }) {
  return (
    <Grid className={classes.rootContainer} justify="center" container>
      <Grid xs={11} sm={10} md={8} item>
        <Typography color="textPrimary" variant="h1">HI!</Typography>
        <Typography color="textPrimary" gutterBottom>
          And welcome to my homepage. I know, I know. I could use a few lessons in design.
          If you have some suggestions, I'd love to hear them!
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          But, more importantly, if you're new to web development, I want to hear from you. Tell me about your struggles,
          your wins, your frustrations and your goals. So reach out to me on <a
            href="http://twitter.com/intent/tweet?text=@AryanJabbari"
            rel="noopener noreferrer"
            target="_blank"
          >Twitter</a> and give me a shout.
        </Typography>
        <Typography color="textPrimary" gutterBottom>
          I will do my best to reach back to each and every one of you. Additionally, your feedback is valuable as I
          create courses, workshops, and tutorials in an effort to get you in the industry.
        </Typography>
      </Grid>
      <CallToAction />
    </Grid>
  )
}

export default withRoot(withStyles(styles)(IndexPage));
