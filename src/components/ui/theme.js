import { createMuiTheme } from '@material-ui/core/styles';

const vaporNeonBlue = '#05FFF9';
const vaporBabyBlue = '#02B8FF';
const vaporIndigo = '#4900FF';
const vaporDeepPurple = '#9601FE';
const vaporHotPink = '#FF00C0';
const vaporOrange = '#FF911E';
const vaporPastelPurple = '#8C1FFE';
const vaporSkyBlue = '#08C7FB';
const vaporDarkPurple = '#560372';
const vaporRed = '#FF2A75';
const vaporYellow = '#FFD416';
const vaporNavy = '#001E29';
const vaporLightNavy = '#085B7E';
const vaporBlue = '#294C77';
const backgroundBlue =  '#131D47'
const logolightblue = '#9AECED' 
const logopink = '#E592B5'  
const logoblue = '#2C3B96'

const theme = createMuiTheme({
  palette: {
    common: {
      neonBlue: `${vaporNeonBlue}`,
      babyBlue: `${vaporBabyBlue}`,
      indigo: `${vaporIndigo}`,
      deepPurple: `${vaporDeepPurple}`,
      hotPink: `${vaporHotPink}`,
      orange: `${vaporOrange}`,
      pastelPurple: `${vaporPastelPurple}`,
      skyBlue: `${vaporSkyBlue}`,
      darkPurple: `${vaporDarkPurple}`,
      red: `${vaporRed}`,
      yellow: `${vaporYellow}`,
      navy: `${vaporNavy}`,
      lightNavy: vaporLightNavy,
      blue: vaporBlue,
      backgroundBlue: backgroundBlue,
      logolightblue,
      logopink,
      logoblue
    },
    primary: { main: `${logoblue}` },
    secondary: { main: `${logolightblue}` },
    info: { main: logopink },
    background: { default: `${backgroundBlue}` },
  },
  typography: {
    fontFamily: 'Spartan',
    tab: {
      textTransform: 'none',
      fontSize: "1rem",
      fontWeight:700
    }
  },
    button: {
      color: 'white',
      background: `linear-gradient(90deg, ${logolightblue} 0%,  ${logopink} 150%)`,
      '&:hover': {
        background: logolightblue,
        color: logopink,
    }
   },

   divider: {
    background: logolightblue,
  
  },
});
export default theme;
