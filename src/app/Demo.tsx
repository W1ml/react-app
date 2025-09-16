import { useState, useMemo, useCallback } from 'react';
import { PostWithLoadingComponent } from '../widgets/PostWithLoading/PostWithLoading';
import { PostLengthFilter } from '../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../features/PostLengthFilter/lib/filterByLength';
import { mockPosts, mockComments } from '../lib/mocks/mocks';
import styles from './Demo.module.css';

export const Demo = () => {
    const [filterOptions, setFilterOptions] = useState({ minLength: 0, maxLength: 100 });

    const filteredPosts = useMemo(() => {
        return filterByLength(mockPosts, filterOptions);
    }, [filterOptions]);


    const handleFilterChange = useCallback((options: { minLength: number; maxLength: number }) => {
        setFilterOptions(options);
    }, []);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Страница для теста</h1>
            
            <PostLengthFilter 
                posts={mockPosts} 
                onFilterChange={handleFilterChange} 
            />

            <PostWithLoadingComponent
                posts={filteredPosts} 
                comments={mockComments}
            />
        </div>
    );
};
