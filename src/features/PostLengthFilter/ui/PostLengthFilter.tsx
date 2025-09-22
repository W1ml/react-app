import { useState, useCallback, memo } from 'react';
import type { Post } from '../../../entities/post/model/types';
import { getMinMaxLengths } from '../lib/filterByLength';
import type { FilterOptions } from '../lib/filterByLength';
import type { ChangeEventHandler, MouseEventHandler } from '../../../shared/types';
import styles from './PostLengthFilter.module.css';

export interface PostLengthFilterProps {
    posts: Post[];
    onFilterChange: (options: FilterOptions) => void;
    className?: string;
}

const PostLengthFilterComponent = ({ posts, onFilterChange, className = '' }: PostLengthFilterProps) => {
    const { min, max } = getMinMaxLengths(posts);
    const [minLength, setMinLength] = useState(min);
    const [maxLength, setMaxLength] = useState(max);

    const handleMinChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const value = Number(event.target.value);
        setMinLength(value);
        onFilterChange({ minLength: value, maxLength });
    }, [maxLength, onFilterChange]);

    const handleMaxChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const value = Number(event.target.value);
        setMaxLength(value);
        onFilterChange({ minLength, maxLength: value });
    }, [minLength, onFilterChange]);

    const handleReset: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        setMinLength(min);
        setMaxLength(max);
        onFilterChange({ minLength: min, maxLength: max });
    }, [min, max, onFilterChange]);

    return (
        <div className={`${styles.filterContainer} ${className}`}>
            <h3 className={styles.title}>Фильтр по длине заголовка</h3>
            
            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        Минимум:
                        <input
                            type="number"
                            className={styles.input}
                            value={minLength}
                            onChange={handleMinChange}
                            min={min}
                            max={max}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        Максимум:
                        <input
                            type="number"
                            className={styles.input}
                            value={maxLength}
                            onChange={handleMaxChange}
                            min={min}
                            max={max}
                        />
                    </label>
                </div>

                <button 
                    className={styles.resetButton} 
                    onClick={handleReset}
                    type="button"
                >
                    Сбросить
                </button>
            </div>

            <div className={styles.info}>
                Диапазон: {min} - {max} символов
            </div>
        </div>
    );
};

export const PostLengthFilter = memo(PostLengthFilterComponent);
