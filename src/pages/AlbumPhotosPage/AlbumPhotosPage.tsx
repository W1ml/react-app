import { useParams } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import type { Album } from '../../entities/album/AlbumTypes';
import { PhotoList } from '../../widgets/PhotoList/PhotoList';
import styles from './AlbumPhotosPage.module.css';

const AlbumPhotosPageComponent = () => {
    const { id } = useParams<{ id: string }>();
    const albumId = parseInt(id || '0');
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
                const albumData = await response.json();
                setAlbum(albumData);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        if (albumId) {
            fetchAlbum();
        }
    }, [albumId]);

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!album) {
        return <div className={styles.error}>Альбом не найден</div>;
    }

    return (
        <div className={styles.albumPhotosPage}>
            <div className={styles.albumHeader}>
                <h1 className={styles.albumTitle}>{album.title}</h1>
                <p className={styles.albumInfo}>ID альбома: {album.id}</p>
            </div>
            <PhotoList albumId={albumId} />
        </div>
    );
};

export const AlbumPhotosPage = memo(AlbumPhotosPageComponent);
