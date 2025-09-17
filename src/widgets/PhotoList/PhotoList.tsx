import { useState, useEffect, useMemo, memo } from 'react';
import type { Photo } from '../../entities/photo/PhotoTypes';
import styles from './PhotoList.module.css';

interface PhotoListProps {
    albumId?: number;
}

const PhotoItem = memo(({ photo }: { photo: Photo }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <div className={styles.photoItem}>
            {!imageError ? (
                <img 
                    src={photo.thumbnailUrl} 
                    alt={photo.title}
                    className={styles.photoImage}
                    loading="lazy"
                    onError={handleImageError}
                />
            ) : (
                <div className={styles.imagePlaceholder}>
                    <span>📷</span>
                    <span>ID: {photo.id}</span>
                </div>
            )}
            <div className={styles.photoInfo}>
                <h4 className={styles.photoTitle}>{photo.title}</h4>
            </div>
        </div>
    );
});

PhotoItem.displayName = 'PhotoItem';

const PhotoListComponent = ({ albumId }: PhotoListProps) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                let url = 'https://jsonplaceholder.typicode.com/photos';
                if (albumId) {
                    url += `?albumId=${albumId}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке фотографий');
                }
                const data = await response.json();
                
                const limitedPhotos = data.slice(0, 50);
                setPhotos(limitedPhotos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [albumId]);

    const photoElements = useMemo(() => {
        return photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
        ))
    }, [photos]);

    const isEmpty = useMemo(() => photos.length === 0, [photos.length]);

    if (loading) {
        return <div className={styles.loading}>Загрузка фотографий...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка: {error}</div>;
    }

    if (isEmpty) {
        return <div className={styles.empty}>Фотографии не найдены</div>;
    }

    return (
        <div className={styles.photoList}>
            <div className={styles.photosCount}>
                Найдено фотографий: {photos.length}
            </div>
            <div className={styles.photosGrid}>
                {photoElements}
            </div>
        </div>
    );
};

export const PhotoList = memo(PhotoListComponent);
