import { memo } from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinnerComponent = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Загрузка...</p>
        </div>
    );
};

export const LoadingSpinner = memo(LoadingSpinnerComponent);
