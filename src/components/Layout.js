import React from 'react'
import Helmet from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../themes/default';
import Navbar from '../components/Navbar'

const TemplateWrapper = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <Helmet title="The WebDev Coach" />
    <Navbar />
    <div>{children}</div>
  </MuiThemeProvider>
);

export default TemplateWrapper
