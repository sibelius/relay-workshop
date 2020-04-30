const reducer = (state, action) => {
  switch (action.type) {
    case 'request': {
      return {
        ...state,
        isFetching: true,
      };
    }
    case 'success': {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    }
    case 'failure': {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isFetching: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts();

        dispatch({ type: 'success', data });
      } catch (error) {
        dispatch({ type: 'failure', error });
      }
    };

    fetchData();
  }, []);

  if (state.isFetching) return <Loading />;
  if (state.error) return <Error>{state.error}</Error>;

  return (
    <>
      {data.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
};
