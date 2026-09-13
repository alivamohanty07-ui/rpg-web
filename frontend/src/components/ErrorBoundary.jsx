import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Power Puff RPG Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090e17] text-white flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900 border-2 border-rose-500/50 shadow-2xl">
            <div className="text-4xl mb-3">⚠️</div>
            <h1 className="text-xl font-bold text-rose-400 mb-2">Realm Portal Glitch</h1>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering hiccup occurred.'}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-lg"
            >
              Reset & Re-enter Realm
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
