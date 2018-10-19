import React from 'react'
import Helmet from 'react-helmet'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../themes/default';
import Navbar from '../components/Navbar'

const styles = {
  root: {
    marginTop: '2vh',
  },
};

const TemplateWrapper = ({ children, classes }) => (
  <MuiThemeProvider theme={theme}>
    <Helmet title="The WebDev Coach" />
    <Navbar />
    <div className={classes.root}>{children}</div>
  </MuiThemeProvider>
);

export default withStyles(styles)(TemplateWrapper);
