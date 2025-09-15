import { useState, useMemo, useCallback, useEffect } from 'react';
import { PostList } from '../widgets/PostList/PostList';
import { PostLengthFilter } from '../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../features/PostLengthFilter/lib/filterByLength';
import { mockPosts, mockComments } from '../lib/mocks/mocks';
import styles from './Demo.module.css';

export const Demo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState({ minLength: 0, maxLength: 100 });

    const filteredPosts = useMemo(() => {
        return filterByLength(mockPosts, filterOptions);
    }, [filterOptions]);


    const handleFilterChange = useCallback((options: { minLength: number; maxLength: number }) => {
        setFilterOptions(options);
    }, []);

    const handleToggleLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [filterOptions]);

    useEffect(() => {
        if (isLoading) {
            const timeoutId = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [isLoading]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Страница для теста</h1>
            
            <button className={styles.loadingButton} onClick={handleToggleLoading} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Показать загрузку'}
            </button>

            <PostLengthFilter 
                posts={mockPosts} 
                onFilterChange={handleFilterChange} 
            />

            <PostList 
                posts={filteredPosts} 
                comments={mockComments}
                isLoading={isLoading}
            />
        </div>
    );
};
