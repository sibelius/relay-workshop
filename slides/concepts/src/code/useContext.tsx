const ThemeContext = React.createContext(themes.light);

const ThemedButton = () => {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>I am styled by theme context!</button>
  );
};
