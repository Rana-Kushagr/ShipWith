import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ShipWith caught boundary error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('shipwith_onboarding');
    } catch (e) {
      // ignore
    }
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-warning-subtle)] text-[var(--color-warning)] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
              {this.props.fallbackMessage || 'Step Recovery Active'}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              We recovered from a cached browser state discrepancy. Click below to refresh your questions seamlessly.
            </p>
            <Button variant="primary" size="sm" onClick={this.handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
              Continue Onboarding
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
