import React, { useMemo, useCallback } from 'react'
import { PostCard } from '../../entities/post/ui/PostCard.tsx'
import type { Post } from '../../entities/post/PostTypes.tsx'
import { withLoading } from '../../shared/lib/hoc/withLoading'
import styles from './PostList.module.css'

interface PostListProps {
    posts: Post[]
    onPostClick?: (post: Post) => void
}

const PostListComponent = ({ posts, onPostClick }: PostListProps) => {
    const handlePostClick = useCallback((post: Post) => {
        if (onPostClick) {
            onPostClick(post)
        }
    }, [onPostClick])

    const postElements = useMemo(() => {
        return posts.map((post) => (
            <PostCard 
                key={post.id} 
                post={post}
                onClick={() => handlePostClick(post)}
            />
        ))
    }, [posts, handlePostClick])

    const isEmpty = useMemo(() => posts.length === 0, [posts.length])

    if (isEmpty) {
        return (
            <div className={styles.emptyState}>
                Постов не найдено
            </div>
        )
    }

    return (
        <div className={styles.postList}>
            {postElements}
        </div>
    )
}

export const PostList = withLoading(PostListComponent)
