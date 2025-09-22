import { useParams } from 'react-router-dom';
import { CommentList } from '../../widgets/CommentList/ui/CommentList';
import styles from './PostDetailPage.module.css';
import { useGetPostByIdQuery } from '../../entities/post/api/postsApi';
import { useGetCommentsByPostQuery } from '../../entities/comment/api/commentsApi';

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const postId = id ? Number(id) : undefined;
    const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery(postId as number, { skip: !postId });
    const { data: comments = [], isLoading: isCommentsLoading } = useGetCommentsByPostQuery(postId as number, { skip: !postId });
    const loading = isPostLoading || isCommentsLoading;

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
