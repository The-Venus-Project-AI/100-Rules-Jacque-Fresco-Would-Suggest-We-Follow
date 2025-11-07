import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="flex items-center space-x-3 mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            We apologize for the inconvenience. An error occurred in the application.
          </p>
          <details className="bg-gray-50 border border-gray-200 rounded p-4">
            <summary className="cursor-pointer font-semibold text-gray-800 hover:text-gray-600">
              Error Details
            </summary>
            <pre className="mt-2 text-sm text-red-600 overflow-auto">{error.message}</pre>
            {error.stack && (
              <pre className="mt-2 text-xs text-gray-600 overflow-auto">{error.stack}</pre>
            )}
          </details>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        // Here you could send to error tracking service like Sentry
      }}
      onReset={() => {
        // Reset app state if needed
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
