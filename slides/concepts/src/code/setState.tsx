class App extends React {
  state = {
    isLoading: true,
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return <Root />;
  }
}
