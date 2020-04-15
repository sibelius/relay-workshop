import { createMuiTheme } from '@material-ui/core/styles';

// TODO - customize material ui theme
export const theme = {
  relayDark: '#F06B1F',
  relayLight: '#F17A35',
};

export const getTheme = () => {
  return {
    ...createMuiTheme({
      palette: {
        primary: {
          main: '#F17A35',
          // dark: '#F06B1F',
        },
      },
    }),
  };
};
