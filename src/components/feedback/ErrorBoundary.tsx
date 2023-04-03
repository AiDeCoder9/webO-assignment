import React, { Component, ErrorInfo, ReactNode } from 'react';
import image from '@/assets/image/401.png';

import Button from '@/components/inputs/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log('error', _);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary-container">
          <div>
            <img src={image} height={'202'} />
            <div className="ml-5">
              <h4>Something went wrong</h4>
              <p>Oops, looks like there are some problem we are facing. Please check in later.</p>
              <Button
                className="btn btn-primary mt-4"
                onClick={() => {
                  window.location.reload();
                }}>
                Reload
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
