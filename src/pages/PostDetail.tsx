import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../shared/ui/Button/Button';
import styles from './UserPage.module.css';

export const PostDetail: FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className={styles.container}>
            <Button to="/posts" variant="back">
                ← К постам
            </Button>
            
            <h1 className={styles.title}>Пост #{id}</h1>
            <p className={styles.content}>Здесь будут детали поста</p>
        </div>
    );
};
