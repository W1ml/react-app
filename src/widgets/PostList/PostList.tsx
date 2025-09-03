import { PostCard } from '../../entities/post/ui/PostCard.tsx'
import type { Post } from '../../entities/post/PostTypes.tsx'

interface PostListProps {
    posts: Post[]
}

export const PostList = ({ posts }: PostListProps) => {
    return (
        <div>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}