import React, { useState, useCallback } from 'react';
import type { Comment } from '../../../entities/comment/CommentTypes';
import styles from './CommentList.module.css';

interface CommentListProps {
    comments: Comment[];
    postId: number;
}

const CommentItem = ({ comment, isCollapsed, onToggle }) => {
    return (
        <div className={styles.commentItem}>
            <div className={styles.commentHeader}>
                <h4 className={styles.commentName}>{comment.name}</h4>
                <button 
                    className={styles.toggleButton}
                    onClick={onToggle}
                >
                    {isCollapsed ? '▼' : '▲'}
                </button>
            </div>
            <p className={styles.commentEmail}>{comment.email}</p>
            {!isCollapsed && (
                <p className={styles.commentBody}>{comment.body}</p>
            )}
        </div>
    );
};

export const CommentList = ({ comments, postId }: CommentListProps) => {
    const [collapsedComments, setCollapsedComments] = useState(new Set());

    const handleToggleComment = useCallback((commentId: number) => {
        setCollapsedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    }, []);

    const postComments = comments.filter(comment => comment.postId === postId);

    return (
        <div className={styles.commentList}>
            <h3 className={styles.title}>
                Комментарии ({postComments.length})
            </h3>
            {postComments.length === 0 ? (
                <p className={styles.noComments}>Комментариев пока нет</p>
            ) : (
                postComments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        isCollapsed={collapsedComments.has(comment.id)}
                        onToggle={() => handleToggleComment(comment.id)}
                    />
                ))
            )}
        </div>
    );
};
