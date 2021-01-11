import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { orange, yellow} from '@material-ui/core/colors';



const sunsetTheme = createMuiTheme({
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

export default sunsetTheme;