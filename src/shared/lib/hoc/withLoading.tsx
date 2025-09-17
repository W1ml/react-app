import React from 'react';
import { LoadingSpinner } from '../../ui/LoadingSpinner/LoadingSpinner';

interface WithLoadingProps {
    isLoading: boolean;
}

export function withLoading<P extends object>(Component: React.ComponentType<P>) {
    const WithLoadingComponent = (props: P & WithLoadingProps) => {
        const { isLoading, ...restProps } = props;

        if (isLoading) {
            return <LoadingSpinner />;
        }

        return <Component {...(restProps as P)} />;
    };

    return WithLoadingComponent;
}
