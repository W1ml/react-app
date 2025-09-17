import { useState, useCallback, useEffect, useMemo } from 'react';
import { PostLengthFilter } from '../../features/PostLengthFilter/ui/PostLengthFilter';
import { filterByLength } from '../../features/PostLengthFilter/lib/filterByLength';
import type { Post } from '../../entities/post/PostTypes';
import styles from './PostsPage.module.css';

export const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [filterOptions, setFilterOptions] = useState({ minLength: 0, maxLength: 100 });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
            }
        };
        fetchPosts();
    }, []);

    const handleFilterChange = useCallback((options: { minLength: number; maxLength: number }) => {
        setFilterOptions(options);
    }, []);

    const filteredPostsList = useMemo(() => {
        return filterByLength(posts, filterOptions);
    }, [posts, filterOptions]);

    useEffect(() => {
        setFilteredPosts(filteredPostsList);
    }, [filteredPostsList]);

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
