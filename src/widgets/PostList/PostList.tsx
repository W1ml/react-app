import { useMemo, memo } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../../features/PostList/model/hooks/usePosts'
import styles from './PostList.module.css'

interface PostListProps {
    userId?: number;
}

const PostCard = memo(({ post }: { post: { id: number; title: string; body: string } }) => (
    <Link to={`/posts/${post.id}`} className={styles.postLink}>
        <div className={styles.postCard}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postBody}>{post.body}</p>
        </div>
    </Link>
));

PostCard.displayName = 'PostCard';

const PostListComponent = ({ userId }: PostListProps) => {
    const { posts, loading, error } = usePosts({ userId });

    const postElements = useMemo(() => {
        return posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))
    }, [posts]);

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
        <div className={styles.postList}>
            {postElements}
        </div>
    )
}

export const PostList = memo(PostListComponent);
