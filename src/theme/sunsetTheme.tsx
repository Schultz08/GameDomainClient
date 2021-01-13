import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { orange, yellow} from '@material-ui/core/colors';



const sunsetTheme = createMuiTheme({
  palette: {
    type: 'light',
    text: {
      primary: "#2a2523"
    },
    background: {
      default: "#424242"
    },
    primary: {
      main: '#be4821',
    },
    secondary: {
      main: '#f1b808',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiInputBase: {
      root: {
        backgroundColor: '#be4821',
        borderColor: "#f1b808",
        marginTop: 10,
        marginBottom: 10,
        "&$focused": {
          borderColor: '#f1b808',
               "&::placeholder": {
            color: "#f1b808"
        }},
      },
      input: {
 
      }
    },
    MuiMenu: {
      list: {
          backgroundColor: "#be4821"
      }

    },
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100vh",
          backgroundImage:
            "radial-gradient(circle, rgba(241,184,8,0.9) 0%, rgba(190,72,33,0.835171568627451) 47%, rgba(154,43,3,0.9) 100%)"
        }
      }
    }
  },

});

export default sunsetTheme;