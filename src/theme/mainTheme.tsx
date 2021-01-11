import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange, yellow} from '@material-ui/core/colors';
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
        MuiInputBase:{
            root: {
                backgroundColor: '#152B38',
                borderColor: "#fff",
                marginTop: 10,
                marginBottom: 10,
                "&$focused": {
                      borderColor: '#fff',
            },
            '& fieldset': {
                borderColor: '#fff',
            },
            '*::-webkit-scrollbar': {
                width: '0.4em'
              },
              '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
              }
            },
            // input: {
                
            // }
        },
        // MuiTextField: {
        //     root: {
        //         backgroundColor: '#152B38',
        //     },
        // }
    },
    
    // props: {
    //     MuiInput: {
    //             color: "primary",
    //             '& label.Mui-focused': {
    //                 color: 'green',
    // }
    

  });


  export default mainTheme;