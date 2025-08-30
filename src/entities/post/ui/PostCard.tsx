import type { Post } from '../PostTypes.ts'

interface PostCardProps {
    post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </article>
    )
}