import React from 'react';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';
import {ErrorBoundary} from 'compontents/error-boundary';
import { FullPageError } from 'compontents/lib';

function App() {
  const { user } = useAuth()
  console.log(8888888)
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {
          user ? <AuthenticatedApp /> : <UnauthenticatedApp />
        }
      </ErrorBoundary>
    </div>
  );
}

export default App;
