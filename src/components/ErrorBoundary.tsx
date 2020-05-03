import React, {Component, ReactNode} from 'react';
import {Text} from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {hasError: false};

  componentDidCatch(error, info) {
    this.setState({hasError: true});

    if (error || info) {
      window.console.log(error);
    }
  }

  render() {
    return (
      <>
        {this.state.hasError ? (
          <Text>Errorerrorerror</Text>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
