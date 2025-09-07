import type { Post } from '../PostTypes.ts'
import styles from './PostCard.module.css'

interface PostCardProps {
    post: Post
    onClick?: () => void
}

export const PostCard = ({ post, onClick }: PostCardProps) => {
    return (
        <article className={styles.postCard} onClick={onClick}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.body}>{post.body}</p>
        </article>
    )
}
