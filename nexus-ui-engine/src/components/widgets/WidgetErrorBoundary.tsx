"use client";
import { Component, ErrorInfo, ReactNode } from "react";

export class WidgetErrorBoundary extends Component<
  { children: ReactNode; name: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Widget [${this.props.name}] crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded">
          {this.props.name} is currently unavailable.
        </div>
      );
    }
    return this.props.children;
  }
}
