// src/components/ErrorBoundary.tsx
import { ErrorBoundary } from "react-error-boundary"; // Note: Correct import is 'react-error-boundary'
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Oops, something went wrong!
          </h2>
          
          <button
            onClick={resetErrorBoundary}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Try Again
            <svg
              className="ml-2 -mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666 5.002 5.002 0 00-8.418-1.743A1 1 0 014 6V3a1 1 0 011-1zm5 1a1 1 0 011-1 5 5 0 015 5 1 1 0 11-2 0 3 3 0 00-3-3 1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error Boundary caught an error:", error, info);
      }}
      onReset={() => {
        navigate("/");
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
