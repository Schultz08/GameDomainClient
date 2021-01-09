import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { orange, yellow} from '@material-ui/core/colors';



export const sunsetTheme = createMuiTheme({
  palette: {
    type: 'light', 
    primary: {
      main: orange[500],
    },
    secondary: {
      main: yellow[800],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});