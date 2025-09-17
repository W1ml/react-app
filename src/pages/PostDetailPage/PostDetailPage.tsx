import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Post } from '../../entities/post/PostTypes';
import type { Comment } from '../../entities/comment/CommentTypes';
import { CommentList } from '../../widgets/CommentList/ui/CommentList';
import styles from './PostDetailPage.module.css';

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();
                setPost(postData);

                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!post) {
        return <div className={styles.error}>Пост не найден</div>;
    }

    return (
        <div className={styles.postDetailPage}>
            <div className={styles.post}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
            
            <div className={styles.comments}>
                <h2>Комментарии</h2>
                <CommentList comments={comments} postId={post.id} />
            </div>
        </div>
    );
};
