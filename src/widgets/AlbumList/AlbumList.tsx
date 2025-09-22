import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import type { Album } from '../../entities/album/AlbumTypes';
import styles from './AlbumList.module.css';
import { useGetAlbumsByUserQuery } from '../../entities/album/api/albumsApi';

interface AlbumListProps {
    userId?: number;
}

const AlbumCard = memo(({ album }: { album: Album }) => (
    <Link 
        to={`/albums/${album.id}/photos`}
        className={styles.albumCard}
    >
        <h3 className={styles.albumTitle}>{album.title}</h3>
        <p className={styles.albumInfo}>ID альбома: {album.id}</p>
    </Link>
));

AlbumCard.displayName = 'AlbumCard';

const AlbumListComponent = ({ userId }: AlbumListProps) => {
    const { data: albums = [], isLoading: loading, isError, error } = useGetAlbumsByUserQuery(userId as number, { skip: !userId });

    const albumElements = useMemo(() => {
        return albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
        ))
    }, [albums]);

    if (loading) {
        return <div className={styles.loading}>Загрузка альбомов...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Ошибка: {(error as any)?.message ?? 'Ошибка'}</div>;
    }

    if (albums.length === 0) {
        return <div className={styles.empty}>Альбомы не найдены</div>;
    }

    return (
        <div className={styles.albumList}>
            {albumElements}
        </div>
    );
};

export const AlbumList = memo(AlbumListComponent);
