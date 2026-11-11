import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md w-full text-center space-y-4">
            <h2 className="text-2xl font-bold text-cyan-400">Something went wrong</h2>
            <p className="text-slate-400 text-sm">
              An unexpected error occurred while loading this section.
            </p>
            <button
              onClick={() => {
                if ('caches' in window) {
                  caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))))
                    .finally(() => window.location.reload());
                } else {
                  window.location.reload();
                }
              }}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
