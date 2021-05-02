const colors_light = {
  primary: '#264F9F',
  secondary: '#FFCD00',
  white: '#fbfbfb',
  black: '#1a1a1a',
  background: '#fff',
};

export const theme = {
  colors: {
    primary: colors_light.primary,
    secondary: colors_light.secondary,
    white: colors_light.white,
    black: colors_light.black,
    background: colors_light.background,
  },
  FAB: {
    titleStyle: {color: colors_light.black},
  },
  Text: {
    style: {fontSize: 16},
    h4Style: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    h3Style: {
      fontSize: 20,
    },
    h2Style: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h1Style: {
      fontSize: 28,
    },
  },
  Button: {
    titleStyle: {
      color: colors_light.black,
    },
    buttonStyle: {borderRadius: 20, backgroundColor: colors_light.secondary},
  },
};
