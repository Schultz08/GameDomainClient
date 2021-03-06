// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme } from '@material-ui/core';
import { orange, yellow} from '@material-ui/core/colors';


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',   
    primary: {
      main: '#152B38',
    },
    secondary: {
      main: '#65C5C7',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default darkTheme;