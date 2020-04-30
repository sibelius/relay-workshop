const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return <Loading />;
  }

  return <Root />;
};
