import { useState, useCallback, memo } from 'react';
import type { Post } from '../PostTypes.ts'
import type { Comment } from '../../comment/CommentTypes';
import { CommentList } from '../../../widgets/CommentList/ui/CommentList';
import styles from './PostCard.module.css'

interface PostCardProps {
    post: Post;
    comments: Comment[];
}

const PostCard = ({ post, comments }: PostCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    return (
        <article className={styles.postCard}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.body}>{post.body}</p>
            
            <button 
                className={styles.toggleButton} 
                onClick={toggleExpanded}
            >
                {isExpanded ? 'Скрыть комментарии' : 'Показать комментарии'}
            </button>
            
            {isExpanded && (
                <div className={styles.commentsSection}>
                    <CommentList comments={comments} postId={post.id} />
                </div>
            )}
        </article>
    )
};

export const PostCardComponent = memo(PostCard);
