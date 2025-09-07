import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../shared/ui/Button/Button';
import styles from './UserPage.module.css';

export const AlbumPhotos: FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className={styles.container}>
            <Button to="/" variant="back">
                ← Назад
            </Button>
            
            <h1 className={styles.title}>Фото из альбома #{id}</h1>
            <p className={styles.content}>Здесь будут фото из альбома</p>
        </div>
    );
};
