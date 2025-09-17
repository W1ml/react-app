import { useState, useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import type { Album } from '../../entities/album/AlbumTypes';
import styles from './AlbumList.module.css';

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
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                let url = 'https://jsonplaceholder.typicode.com/albums';
                if (userId) {
                    url += `?userId=${userId}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке альбомов');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [userId]);

    const albumElements = useMemo(() => {
        return albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
        ))
    }, [albums]);

    if (loading) {
        return <div className={styles.loading}>Загрузка альбомов...</div>;
    }

    if (error) {
        return <div className={styles.error}>Ошибка: {error}</div>;
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
