import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  overrides: {
    MuiSwitch: {
      colorSecondary: {
        "&$checked": {
          color: "#32c7a2",
          "&+$track": {
            backgroundColor: "#a1a1a1",
          },
        },
      },
    },
  },
});

export default theme;

