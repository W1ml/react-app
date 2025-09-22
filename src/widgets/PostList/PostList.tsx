import { useMemo, memo, type MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../../features/PostList/model/hooks/usePosts'
import type { Post } from '../../entities/post/model/types'
import styles from './PostList.module.css'

export interface PostListProps {
    userId?: number;
    onPostClick?: (post: Post) => void;
    className?: string;
}

interface PostCardProps {
    post: Post;
    onPostClick?: (post: Post) => void;
}

const PostCard = memo(({ post, onPostClick }: PostCardProps) => {
    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        onPostClick?.(post);
    };

    return (
        <Link to={`/posts/${post.id}`} className={styles.postLink}>
            <div 
                className={styles.postCard}
                onClick={onPostClick ? handleClick : undefined}
                style={{ cursor: onPostClick ? 'pointer' : 'default' }}
            >
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBody}>{post.body}</p>
            </div>
        </Link>
    );
});

PostCard.displayName = 'PostCard';

const PostListComponent = ({ userId, onPostClick, className = '' }: PostListProps) => {
    const { posts, loading, error } = usePosts({ userId });

    const postElements = useMemo(() => {
        return posts.map((post) => (
            <PostCard 
                key={post.id} 
                post={post} 
                onPostClick={onPostClick}
            />
        ))
    }, [posts, onPostClick]);

    const isEmpty = useMemo(() => posts.length === 0, [posts.length]);

    if (loading) {
        return (
            <div className={styles.loading}>
                Загрузка постов...
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>
                Ошибка: {error}
            </div>
        )
    }

    if (isEmpty) {
        return (
            <div className={styles.emptyState}>
                Постов не найдено
            </div>
        )
    }

    return (
        <div className={`${styles.postList} ${className}`}>
            {postElements}
        </div>
    )
}

export const PostList = memo(PostListComponent);
