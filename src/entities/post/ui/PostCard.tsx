import { useState, useCallback, memo, type MouseEventHandler } from 'react';
import type { Post } from '../model/types';
import type { Comment } from '../../comment/model/types';
import { CommentList } from '../../../widgets/CommentList/ui/CommentList';
import styles from './PostCard.module.css';

interface PostCardProps {
    post: Post;
    comments: Comment[];
    onPostClick?: (post: Post) => void;
}

const PostCardComponent = ({ post, comments, onPostClick }: PostCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        event.stopPropagation();
        setIsExpanded(prev => !prev);
    }, []);

    const handlePostClick: MouseEventHandler<HTMLElement> = useCallback(() => {
        onPostClick?.(post);
    }, [onPostClick, post]);

    return (
        <article 
            className={styles.postCard}
            onClick={handlePostClick}
            style={{ cursor: onPostClick ? 'pointer' : 'default' }}
        >
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.body}>{post.body}</p>
            
            <button 
                className={styles.toggleButton} 
                onClick={toggleExpanded}
                type="button"
            >
                {isExpanded ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>
            
            {isExpanded && (
                <div className={styles.commentsSection}>
                    <CommentList comments={comments} postId={post.id} />
                </div>
            )}
        </article>
    );
};

export const PostCard = memo(PostCardComponent);
