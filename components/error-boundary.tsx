// components/error-boundary.tsx
"use client";
import { Component, ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback() {
  const { t } = useLanguage();
  return (
    <div className="container py-8 md:py-12 flex justify-center items-center">
      <h2 className="text-xl font-bold text-red-500 mb-2">{t("error")}</h2>
      <p>{t("something_went_wrong")}</p>
    </div>
  );
}