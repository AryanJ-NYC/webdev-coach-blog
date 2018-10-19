import React from 'react'
import Helmet from 'react-helmet'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from '../themes/default';
import Navbar from '../components/Navbar'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

const styles = {
  root: {
    marginTop: '2vh',
  },
};

const TemplateWrapper = ({ children, classes }) => (
  <>
    <Helmet title="The WebDev Coach" />
    <JssProvider generateClassName={generateClassName} classNamePrefix="">
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <div className={classes.root}>{children}</div>
      </MuiThemeProvider>
    </JssProvider>
  </>
);

export default withStyles(styles)(TemplateWrapper);
