import { useParams } from 'react-router-dom';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { AlbumList } from '../../widgets/AlbumList/AlbumList';
import styles from './UserAlbumsPage.module.css';
import { useGetUserByIdQuery } from '../../entities/user/api/usersApi';

export const UserAlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id || '0');
    const { data: user, isLoading: loading } = useGetUserByIdQuery(userId, { skip: !userId });

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!user) {
        return <div className={styles.error}>Пользователь не найден</div>;
    }

    return (
        <div className={styles.userAlbumsPage}>
            <UserTabs userId={userId} userName={user.name} />
            <AlbumList userId={userId} />
        </div>
    );
};
