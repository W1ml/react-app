import React from 'react';
import styles from './withLoading.module.css';

interface WithLoadingProps {
    isLoading: boolean;
}

const LoadingSpinner = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Загрузка...</p>
        </div>
    );
};

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
