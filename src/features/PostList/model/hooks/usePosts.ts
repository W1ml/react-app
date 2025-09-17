import { useState, useEffect } from 'react';
import type { Post } from '../../../../entities/post/PostTypes';

interface UsePostsOptions {
    userId?: number;
}

export const usePosts = (options: UsePostsOptions = {}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                let url = 'https://jsonplaceholder.typicode.com/posts';
                if (options.userId) {
                    url += `?userId=${options.userId}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке постов');
                }
                
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [options.userId]);

    return { posts, loading, error };
};
