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

const theme = createMuiTheme({
  palette: {
    common: {
      NeonBlue: `${vaporNeonBlue}`,
      BabyBlue: `${vaporBabyBlue}`,
      Indigo: `${vaporIndigo}`,
      DeepPurple: `${vaporDeepPurple}`,
      HotPink: `${vaporHotPink}`,
      Orange: `${vaporOrange}`,
      PastelPurple: `${vaporPastelPurple}`,
      SkyBlue: `${vaporSkyBlue}`,
      DarkPurple: `${vaporDarkPurple}`,
      Red: `${vaporRed}`,
      Yellow: `${vaporYellow}`,
    },
    primary: { main: `${vaporDarkPurple}` },
    secondary: { main: `${vaporNeonBlue}` },
    info: { main: '#560372' },
    background: { default: '#001E29' },
  },
  typography: {
    fontFamily: 'Spartan',
  },
});
export default theme;
