import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { orange, yellow} from '@material-ui/core/colors';



const mainTheme = createMuiTheme({
    palette: {
      type: 'light',   
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


  export default mainTheme;