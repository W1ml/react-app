import { useMemo, memo } from 'react'
import { PostCardComponent } from '../../entities/post/ui/PostCard.tsx'
import type { Post } from '../../entities/post/PostTypes.tsx'
import type { Comment } from '../../entities/comment/CommentTypes'
import styles from './PostList.module.css'

interface PostListProps {
    posts: Post[];
    comments: Comment[];
}

const PostList = ({ posts, comments }: PostListProps) => {

    const postElements = useMemo(() => {
        return posts.map((post) => (
            <PostCardComponent
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

export const PostsList = memo(PostList);
