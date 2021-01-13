import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange, yellow } from '@material-ui/core/colors';
import { DensityTypes } from '@material-ui/data-grid';


//ADDS CUSTOM PROPERTIES TOO CREATEMUITHEME

// declare module '@material-ui/core/styles/createMuiTheme' {
//     interface Theme {
//       sideBar: {
//         danger: React.CSSProperties['color'],
//       }
//     }
//     interface ThemeOptions {
//       sideBar: {
//         danger: React.CSSProperties['color']
//       }
//     }
//   }

//   declare module "@material-ui/core/styles/createPalette" {
//     interface Palette {
//       neutral: Palette['primary'];
//     }
//     interface PaletteOptions {
//       neutral: PaletteOptions['primary'];
//     }
//   }

const mainTheme = createMuiTheme({

  palette: {
    type: 'light',
    text: {
      primary: "#fff"
    },
    background: {
      default: "#424242"
    },
    primary: {
      main: '#152B38',
    },
    secondary: {
      main: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiInputBase: {
      root: {
        backgroundColor: '#152B38',
        borderColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        "&$focused": {
          borderColor: '#fff',
               "&::placeholder": {
            color: "#fff"
        }},
      },
      input: {
 
      }
    },
    MuiMenu: {
      list: {
          backgroundColor: "#152B38"
      }

    },
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100vh",
          backgroundImage:
            "linear-gradient(333deg, rgba(7,8,7,0.9) 0%, rgba(82,79,78,0.8323704481792717) 66%, rgba(9,9,9,0.9) 100%)"
        }
      }
    }
  },

});

export default mainTheme;