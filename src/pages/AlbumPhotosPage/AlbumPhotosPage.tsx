import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { PhotoList } from '../../widgets/PhotoList/PhotoList';
import styles from './AlbumPhotosPage.module.css';
import { useGetAlbumByIdQuery } from '../../entities/album/api/albumsApi';

const AlbumPhotosPageComponent = () => {
    const { id } = useParams<{ id: string }>();
    const albumId = parseInt(id || '0');
    const { data: album, isLoading: loading } = useGetAlbumByIdQuery(albumId, { skip: !albumId });

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
