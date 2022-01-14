import { createTheme } from '@mui/material/styles';

// TODO - customize material ui theme
export const theme = {
  relayDark: '#F06B1F',
  relayLight: '#F17A35',
};

export const getTheme = () => ({
  ...createTheme({
    palette: {
      primary: {
        main: '#F17A35',
        // dark: '#F06B1F',
      },
    },
  }),
});
