import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { UserTabs } from '../../widgets/UserTabs/UserTabs';
import { PostList } from '../../widgets/PostList/PostList';
import styles from './UserPostsPage.module.css';
import { useGetUserByIdQuery } from '../../entities/user/api/usersApi';

const UserPostsPageComponent = () => {
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
        <div className={styles.userPostsPage}>
            <UserTabs userId={userId} userName={user.name} />
            <PostList userId={userId} />
        </div>
    );
};

export const UserPostsPage = memo(UserPostsPageComponent);
