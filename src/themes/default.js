import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#113643'
    },
    secondary: {
      main: '#FE7F2D',
    },
    error: red,
  },
  typography: {
    allVariants: {
      letterSpacing: 0.75,
    },
    fontSize: 16,
    useNextVariants: true,
  },
});
