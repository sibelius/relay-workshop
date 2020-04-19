import React from 'react';
import { Button, Content } from '@workshop/ui';
import { Text } from 'rebass';

/**
 * A reusable component for handling errors in a React (sub)tree.
 */
type Props = {};
type State = {
  error: Error;
};
class ErrorBoundaryRetry extends React.Component<Props, State> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  render() {
    const { error } = this.state;

    if (error != null) {
      return (
        <Content>
          <Text>Error: {error.message}</Text>
          <pre>{JSON.stringify(error.source, null, 2)}</pre>
          <Button mt='10px' onClick={() => this.setState({ error: null })}>
            retry
          </Button>
        </Content>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryRetry;
