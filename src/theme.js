import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#FD7687" },
    secondary: { main: "#08C7FB" },
    info: { main: "#560372" },
    background: { default: "#001E29" },
  },
  typography: {
    fontFamily: "Nunito",
  },
});
export default theme;
