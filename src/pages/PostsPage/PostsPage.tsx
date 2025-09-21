import { useState, useCallback, useMemo, useEffect } from 'react';
import { PostLengthFilter } from '../../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../../features/PostLengthFilter/lib/filterByLength';
import type { Post } from '../../entities/post/PostTypes';
import styles from './PostsPage.module.css';
import { useGetPostsQuery } from '../../entities/post/api/postsApi';

export const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [filterOptions, setFilterOptions] = useState({ minLength: 0, maxLength: 100 });
    const { data: postsData, isLoading, isError } = useGetPostsQuery();

    if (postsData && posts !== postsData) {
        setPosts(postsData);
    }

    const handleFilterChange = useCallback((options: { minLength: number; maxLength: number }) => {
        setFilterOptions(options);
    }, []);

    const filteredPostsList = useMemo(() => {
        return filterByLength(posts, filterOptions);
    }, [posts, filterOptions]);

    useEffect(() => {
        setFilteredPosts(filteredPostsList);
    }, [filteredPostsList]);

    if (isLoading) {
        return <div className={styles.postsPage}>Загрузка постов...</div>;
    }

    if (isError) {
        return <div className={styles.postsPage}>Ошибка загрузки постов</div>;
    }

    return (
        <div className={styles.postsPage}>
            <h1>Все посты</h1>
            {posts.length > 0 && (
                <PostLengthFilter 
                    posts={posts}
                    onFilterChange={handleFilterChange}
                />
            )}
            <div>
                <p>Показано постов: {filteredPosts.length} из {posts.length}</p>
            </div>
            <div>
                {filteredPosts.map(post => (
                    <div key={post.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
