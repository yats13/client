'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Calendar Error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <div>Произошла ошибка при загрузке календаря.</div>;
        }

        return this.props.children;
    }
} 