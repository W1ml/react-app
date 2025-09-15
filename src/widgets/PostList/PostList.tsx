import { useMemo } from 'react'
import { PostCard } from '../../entities/post/ui/PostCard.tsx'
import type { Post } from '../../entities/post/PostTypes.tsx'
import type { Comment } from '../../entities/comment/CommentTypes'
import { withLoading } from '../../shared/lib/hoc/withLoading'
import styles from './PostList.module.css'

interface PostListProps {
    posts: Post[];
    comments: Comment[];
}

const PostListComponent = ({ posts, comments }: PostListProps) => {

    const postElements = useMemo(() => {
        return posts.map((post) => (
            <PostCard 
                key={post.id} 
                post={post}
                comments={comments}
            />
        ))
    }, [posts, comments])

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
