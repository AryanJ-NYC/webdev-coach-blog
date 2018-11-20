import React from 'react';
import Helmet from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from './getPageContext';
import Header from './components/Header'

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props) {
      super(props);
      this.muiPageContext = getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <>
          <Helmet>
            <title>The WebDev Coach</title>
            <meta name="google-site-verification" content="ZVCOkHtG1HJg4pJ-lgnRdDjcXfhChLNXFZ9YIWbomcs" />
          </Helmet>
          <JssProvider generateClassName={this.muiPageContext.generateClassName}>
            {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.muiPageContext.theme}
              sheetsManager={this.muiPageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Header />
              <div style={{ marginTop: '2vh'}}>
                <Component {...this.props} />
              </div>
            </MuiThemeProvider>
          </JssProvider>
        </>
      );
    }
  }

  return WithRoot;
}

export default withRoot;
