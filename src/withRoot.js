import React from 'react';
import Helmet from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from './getPageContext';
import Navbar from './components/Navbar'

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
          <Helmet title="The WebDev Coach" />
          <JssProvider generateClassName={this.muiPageContext.generateClassName}>
            {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
            <MuiThemeProvider
              theme={this.muiPageContext.theme}
              sheetsManager={this.muiPageContext.sheetsManager}
            >
              <Navbar />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              {/* <CssBaseline /> */}
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
