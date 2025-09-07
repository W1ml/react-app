import { FC } from 'react';
import { usePosts } from '../features/PostList/model/hooks';
import { Button } from '../shared/ui/Button/Button';
import styles from './Posts.module.css';

export const Posts: FC = () => {
    const posts = usePosts();

    return (
        <div className={styles.container}>
            <Button to="/" variant="back">
                ← Назад
            </Button>
            
            <h1 className={styles.title}>Все посты</h1>
            
            <div className={styles.postList}>
                {posts.map(post => (
                    <div key={post.id} className={styles.postCard}>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        <p className={styles.postBody}>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
