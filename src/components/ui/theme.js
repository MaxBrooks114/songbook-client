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
    },
    primary: { main: `${vaporLightNavy}` },
    secondary: { main: `${vaporNeonBlue}` },
    info: { main: '#560372' },
    background: { default: `${vaporNavy}` },
  },
  typography: {
    fontFamily: 'Spartan',
  },
});
export default theme;
