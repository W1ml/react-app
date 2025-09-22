import { useState, useMemo, memo } from 'react';
import type { Photo } from '../../entities/photo/PhotoTypes';
import styles from './PhotoList.module.css';
import { useGetPhotosByAlbumQuery } from '../../entities/photo/api/photosApi';

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
    const { data = [], isLoading: loading, isError, error } = useGetPhotosByAlbumQuery(albumId as number, { skip: !albumId });
    const photos = data.slice(0, 50);

    const photoElements = useMemo(() => {
        return photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
        ))
    }, [photos]);

    const isEmpty = useMemo(() => photos.length === 0, [photos.length]);

    if (loading) {
        return <div className={styles.loading}>Загрузка фотографий...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Ошибка: {(error as any)?.message ?? 'Ошибка'}</div>;
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
