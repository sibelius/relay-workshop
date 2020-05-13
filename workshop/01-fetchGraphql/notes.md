# Fetching GraphQL Data

You can fetch GraphQL data in the same way you fetch REST data, but doing this you won't get all the benefits of it.

## Data Fetching

In React you have 3 approaches to fetch data:
1. Fetch-on-render (for example, fetch in useEffect)
2. Fetch-then-render (for example, Relay without Suspense)
3. Render-as-you-fetch (for example, Relay with Suspense)

### Fetch-on-render

```jsx
const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  );
}
```

### Fetch-then-render
```jsx
<QueryRenderer
  environment={environment}
  query={query}
  variables={variables}
  render={({ error, props, retry }) => {
    if (error) {
      // render error 
    }

    if (props) {
      // render component      
    }
    
    // render loading
  }}
/>
```

### Render-as-you-fetch
```jsx
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

## Reading 

- https://reactjs.org/docs/concurrent-mode-suspense.html