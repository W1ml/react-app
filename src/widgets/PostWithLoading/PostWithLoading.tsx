import { useState, useCallback, useEffect, memo } from 'react';
import { PostsList } from '../PostList/PostList';
import { withLoading } from '../../shared/lib/hoc/withLoading';
import type { Post } from '../../entities/post/PostTypes';
import type { Comment } from '../../entities/comment/CommentTypes';
import styles from './PostWithLoading.module.css';

const PostListWithLoading = withLoading(PostsList);

interface PostWithLoadingProps {
    posts: Post[];
    comments: Comment[];
}

const PostWithLoading = ({ posts, comments }: PostWithLoadingProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

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
            <button 
                className={styles.loadingButton} 
                onClick={handleToggleLoading} 
                disabled={isLoading}
            >
                {isLoading ? 'Загрузка...' : 'Показать загрузку'}
            </button>
            
            <PostListWithLoading 
                posts={posts}
                comments={comments}
                isLoading={isLoading}
            />
        </div>
    );
};

export const PostWithLoadingComponent = memo(PostWithLoading);
