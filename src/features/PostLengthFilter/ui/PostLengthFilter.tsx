import React, { useState, useCallback } from 'react';
import type { Post } from '../../../entities/post/PostTypes';
import { getMinMaxLengths } from '../lib/filterByLength';
import type { FilterOptions } from '../lib/filterByLength';
import styles from './PostLengthFilter.module.css';

interface PostLengthFilterProps {
    posts: Post[];
    onFilterChange: (options: FilterOptions) => void;
}

export const PostLengthFilter = ({ posts, onFilterChange }: PostLengthFilterProps) => {
    const { min, max } = getMinMaxLengths(posts);
    const [minLength, setMinLength] = useState(min);
    const [maxLength, setMaxLength] = useState(max);

    const handleMinChange = useCallback((event) => {
        const value = Number(event.target.value);
        setMinLength(value);
        onFilterChange({ minLength: value, maxLength });
    }, [maxLength, onFilterChange]);

    const handleMaxChange = useCallback((event) => {
        const value = Number(event.target.value);
        setMaxLength(value);
        onFilterChange({ minLength, maxLength: value });
    }, [minLength, onFilterChange]);

    const handleReset = useCallback(() => {
        setMinLength(min);
        setMaxLength(max);
        onFilterChange({ minLength: min, maxLength: max });
    }, [min, max, onFilterChange]);

    return (
        <div className={styles.filterContainer}>
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
                        />
                    </label>
                </div>

                <button className={styles.resetButton} onClick={handleReset}>
                    Сбросить
                </button>
            </div>

            <div className={styles.info}>
                Диапазон: {min} - {max} символов
            </div>
        </div>
    );
};
