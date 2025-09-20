import { memo } from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinnerComponent = () => {
    return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>Загрузка...</p>
        </div>
    );
};

export const LoadingSpinner = memo(LoadingSpinnerComponent);
